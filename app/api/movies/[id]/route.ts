import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Aseguramos que el tipo de contexto sea adecuado para Next.js 13+
export async function GET(
  request: NextRequest,
   { params }: { params: Promise<{ id: string }> } // Mantenemos este tipo, pero ajustamos el manejo de parámetros
) {
  try {
    const id = (await params).id

    // Validar que el id sea válido
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const objectId = new ObjectId(id);
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    // Buscar la película en la base de datos
    const movie = await db.collection("movies").findOne({ _id: objectId });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

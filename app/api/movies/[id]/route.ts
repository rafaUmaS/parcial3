import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Extraer el `id` dinámico de los parámetros de la ruta
    const { id } = context.params; // Ajuste aquí para usar `context.params`
    const objectId = new ObjectId(id);

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    // Buscar el detalle de la película basada en el `id`
    const movie = await db.collection("movies").findOne({ _id: objectId });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
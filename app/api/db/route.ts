import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // Importa tu cliente MongoDB

// Esta función maneja las solicitudes GET a la API
export async function GET(request: Request) {
  try {
    // Obtén los parámetros de la URL
    const { searchParams } = new URL(request.url);
    const linea = searchParams.get('linea');
    const sentido = searchParams.get('sentido');

    // Conéctate a la base de datos de MongoDB
    const client = await clientPromise;
    const db = client.db('parcial2');  // Reemplaza con el nombre de tu base de datos

    // Realiza la consulta a la colección de paradas
    const paradas = await db.collection('paradas')
      .find({ linea, sentido })
      .toArray();

    // Retorna las paradas como respuesta en formato JSON
    return NextResponse.json(paradas);
  } catch (error) {
    console.error("Error al obtener las paradas:", error);
    return NextResponse.json({ error: 'Error al obtener las paradas' }, { status: 500 });
  }
}
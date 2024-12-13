import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const gmail = url.searchParams.get('gmail');

  if (!gmail) {
    return NextResponse.json({ error: 'Gmail is required' }, { status: 400 });
  }

  try {
    // Conecta a la base de datos
    const db = await clientPromise.db('parcial3');
    const collection = db.collection('users');

    // Busca el usuario por gmail
    const user = await collection.findOne({ "gmail" : gmail });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Devuelve las coordenadas
    return NextResponse.json({ coordenadas: user.coordenadas });
  } catch (error) {
    console.error('Error fetching user coordinates:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching data' },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar datos recibidos
    const { lat, lng, email } = body;
    if (!lat || !lng || !email) {
      return NextResponse.json({ error: 'Faltan datos requeridos.' }, { status: 400 });
    }

    // Conexión a MongoDB
    const db = (await clientPromise).db('parcial3');
    const collection = db.collection('users');

    // Actualizar el usuario con las nuevas coordenadas
    const result = await collection.updateOne(
      { gmail: email }, // Buscar por correo
      { $push: { coordenadas: { lat, lng } } } // Añadir coordenadas al array
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Coordenadas añadidas correctamente.' });
  } catch (error) {
    console.error('Error al añadir coordenadas:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}

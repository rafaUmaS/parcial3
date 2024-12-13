import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const uri = process.env.MONGO_URI; // La URI de conexión a tu base de datos

// Función para obtener las URLs de imágenes asociadas a un usuario
async function getImagesForUser(email: string) {
  try {
    const client =await  clientPromise;
    const database = client.db('parcial3'); // Nombre de tu base de datos
    const usersCollection = database.collection('users'); // Nombre de tu colección

    // Busca al usuario por correo electrónico
    const user = await usersCollection.findOne({ gmail: email });

    if (user) {
      // Si el usuario existe, devuelve las URLs de imágenes
      return user.urls || []; // Si no hay URLs, devuelve un array vacío
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error al obtener las imágenes:', error);
    return [];
  } 
}

// Endpoint GET para obtener las URLs de imágenes
export async function GET(req: Request) {
    const url = new URL(req.url)
    const  email  = url.searchParams.get('gmail'); // Suponemos que el email se pasa en la URL como parámetro de consulta

  if (!email) {
    return NextResponse.json({ error: 'Email es necesario' }, { status: 400 });
  }

  try {
    const images = await getImagesForUser(email);

    if (images.length === 0) {
      return NextResponse.json({ message: 'No se encontraron imágenes para este usuario.' });
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    return NextResponse.json({ error: 'Error desconocido' }, { status: 500 });
  }
}
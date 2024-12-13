import {auth} from "@/auth";
import client from "@/lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Nav from "../componentes/nav";
import { redirect } from "next/navigation";
import Cloudinary from "../componentes/cloudinary";
async function fetchMovies():Promise<unknown[]>{
    try {
      // Conectar a MongoDB si es necesario
      await client.connect();
  
      // Realizar la solicitud a tu API para obtener las películas
      const res = await fetch(`http://localhost:3000/api/movies`);
      const movies = await res.json();
      return movies;
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Si ocurre un error, devolver un array vacío
    }
  }

export default async function Home(){
  const movies = await fetchMovies();
  const session = await auth();
  if(!session){
    redirect('/')
  }
  const user = session?.user;
  
  return (
    <main>
      <Nav></Nav>
      <h1>Bienvenido {user?.name} </h1>
      <h2>Lista de Películas</h2>
      <ul>
        {movies.length === 0 ? (
          <li>No hay películas disponibles.</li>
        ) : (
          movies.map((movie: any) => (
            <li key={movie._id}>
              <h2>{movie.title}</h2>
            </li>
          ))
        )}
      </ul>
      <div>
        <h2>Foto de cloudinary</h2>
        <Cloudinary id="cld-sample-5"></Cloudinary>
      </div>
    </main>
  )
};
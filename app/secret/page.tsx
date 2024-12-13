import {auth} from "@/auth";
import client from "@/lib/mongodb";
import Nav from "../componentes/nav";
import { redirect } from "next/navigation";
import Cloudinary from "../componentes/cloudinary";
import Map from "./../componentes/map";
async function fetchMovies():Promise<unknown[]>{
    try {
      // Conectar a MongoDB si es necesario
      await client.connect();
  
      // Realizar la solicitud a tu API para obtener las películas
      //local / dep
      const res = await fetch(`http://localhost:3000/api/movies`);
      //const res = await fetch(`https://parcial3-mu.vercel.app/api/movies`);
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
      <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
        <Map posix={{ lat: 36.7213, lng: -4.4216 }}  />
        </div> 
    </main>
  )
};
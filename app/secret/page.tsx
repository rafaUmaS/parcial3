import {auth} from "@/auth";
import client from "@/lib/mongodb";
import Nav from "../componentes/nav";
import { redirect } from "next/navigation";
import Cloudinary from "../componentes/cloudinary";
import Map from "./../componentes/map";

export default async function Home(){
  const session = await auth();
  if(!session){
    redirect('/')
  }
  const user = session?.user;
  return (
    <main>
      <Nav></Nav>
      <div>
        <h1>Bienvenido {user?.name} </h1>
        <h2>Galería</h2>
      </div>
      <Cloudinary id="cld-sample-5"></Cloudinary>
      <div className="bg-white-700 mx-auto my-5 w-[98%] h-[100px]">
        <Map  />
        </div> 
      
    </main>
  )
};
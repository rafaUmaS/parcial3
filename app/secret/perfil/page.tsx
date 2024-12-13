import {auth} from "@/auth";
import Nav from "@/app/componentes/nav";
import { redirect } from "next/navigation";

export default async function Perfil(){
    const session = await auth();
    const user = session?.user;
    if(!session){
        redirect('/');
    }
    return (
        <>
       <Nav></Nav> 
       <div>
            <h1>{user?.name}</h1>
       </div>
       </>
    )
}
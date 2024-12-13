import { redirect } from "next/navigation";
import SignIn from "./componentes/login";
import {auth} from "@/auth"

export default async function Home() {
  // Redirige automáticamente a /login
  const session = await auth();
  if(session){
    redirect("/secret")
  }
  return(
  <SignIn></SignIn>

  )
}
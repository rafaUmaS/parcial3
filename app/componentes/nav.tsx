import Link from "next/link";
import {auth} from "@/auth";
import SignIn from "./login";
export default function Nav() {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f0f0f0" }}>
        <div>
            <Link href="/secret">
                Home
            </Link>
        </div>
        <div>
            <Link href="/secret/perfil">
                Perfil
            </Link>
        </div>
        <div>
            <SignIn></SignIn>
        </div>
      
      
    </nav>
  );
}
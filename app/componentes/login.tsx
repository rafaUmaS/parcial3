import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/auth"
export default async function SignIn() {
    const session = await auth();
    const user = session?.user

  
  return !user? (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  ): (
    <form
      action={async () => {
        "use server"
        await signOut()
        redirect('/')
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
} 
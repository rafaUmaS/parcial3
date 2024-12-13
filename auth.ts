import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import client from "@/lib/mongodb"
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Verifica los datos del usuario
        console.log("Datos del usuario:", user);

        // Conectar a la base de datos y obtener la colección
        const db = client.db("parcial2");  // Nombre de tu base de datos
        const collection = db.collection("logInfo");  // Nombre de la colección
        
        // Asegúrate de que el usuario tenga la información que deseas guardar
        const logInfo = {
          email: user.email,
          name: user.name,
          timestamp: new Date(), // Guardamos la fecha y hora del inicio de sesión
        };

        // Insertar los datos en la colección
        await collection.insertOne(logInfo);

        console.log('Información del log insertada correctamente');
        
        // Retorna true si la inserción fue exitosa
        return true;
      } catch (error) {
        console.error('Error al guardar la información del log:', error);
        
        // Retorna false si algo salió mal
        return false;
      }
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.email = user.email; // Guardamos el email del usuario en el token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
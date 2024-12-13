import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import client from "@/lib/mongodb"
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
  ],
  debug: true,
  // callbacks: {
  //   async signIn({ user, account, profile }) {
  //     try {
  //       console.log("User Data:", user);
  //       console.log("Account Data:", account); // Check account data
  //       console.log("Profile Data:", profile); // Check profile data
        
  //       // MongoDB insertion logic
  //       const db = client.db("parcial2");
  //       const collection = db.collection("logInfo");
        
  //       const logInfo = {
  //         email: user.email,
  //         name: user.name,
  //         timestamp: new Date(),
  //       };
    
  //       await collection.insertOne(logInfo);
  //       console.log('Log inserted successfully');
        
  //       return true;
  //     } catch (error) {
  //       console.error('Error during sign-in callback:', error);
  //       return false;
  //     }
  //   },
    
  // },
  
});
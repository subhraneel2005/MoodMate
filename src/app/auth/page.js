"use client"

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";


export default function AuthPage(){

    const provider = new GoogleAuthProvider();
    const router = useRouter();
    
    const googleAuthHandler = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
  
          router.push("/theme")
          
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }

    return(
        <main className="min-h-screen bg-sky-900 w-full p-3 flex justify-center items-center select-none">
            <div className="block space-y-10">
            <h1 className="text-center text-4xl">Looks like you are not signed in🤔!</h1>
            <div className="w-full h-full flex justify-center items-center">
            <button className="px-5 py-2 rounded-lg border-2 border-sky-500 hover:bg-sky-800 duration-300" onClick={googleAuthHandler}>Authenticate with google</button>
            </div>
            </div>
        </main>
    )
}
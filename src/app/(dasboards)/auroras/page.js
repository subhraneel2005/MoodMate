"use client"

import { auth } from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function SnowMountains(){

  const auth = getAuth();
  const user = auth.currentUser;

  const router = useRouter();

  const logOut = () => {
    auth.signOut();
    router.push("/");
  }

  if(!user){
    router.push("/auth")
  }
    return(
        <main className="min-h-screen w-full flex select-none">
          <div className="md:w-[20%] block bg-purple-800 py-6 px-2">
             <ul className="block space-y-8 text-xl cursor-pointer mt-52">
                <li className="px-5 py-2 rounded-lg border-2 bg-purple-600 hover:bg-purple-800 duration-300">Write today's journal</li>
                <li className="px-5 py-2 rounded-lg border-2 bg-purple-500 hover:bg-purple-800 duration-300">View Profile</li>
                <Popover>
                  <PopoverTrigger>
                    <li className="px-5 py-2 rounded-lg border-2 bg-red-800 hover:bg-red-950 duration-300">Logout</li>
                  </PopoverTrigger>
                  <PopoverContent>
                    <h1>Are your sure?</h1>
                    <button className="px-3 py-2 mt-4 rounded-lg border-2 bg-red-800 hover:bg-red-950 duration-300" onClick={logOut}>Yes</button>
                  </PopoverContent>
                </Popover>
             </ul>
          </div>
          <div className="md:w-[80%] auroraBG flex justify-center items-center relative p-3">
          <h1 className="text-3xl absolute top-9 left-20">Hey {user?.displayName}👋 welcome to the Auroras ✨</h1>
            <nav className="p-5 top-0 right-0 absolute">
             <Popover>
              <PopoverTrigger>
              <img src={user?.photoURL} className="rounded-full h-16 w-16 cursor-pointer border-4 border-teal-500" alt="user" />
              </PopoverTrigger>
              <PopoverContent>
                <ul className="space-y-4 text-[16px]">
                  <li>{user?.displayName}</li>
                  <li>{user?.email}</li>
                  <li className="px-3 py-2 rounded-lg border-2 bg-red-800 hover:bg-red-950 duration-300" onClick={logOut}>Logout</li>
                </ul>
              </PopoverContent>
             </Popover>
            </nav>
            <div className="block space-y-4">
              <h1 className="text-3xl text-center text-indigo-300 mt-4">Your Journals 📖</h1>
              <button className="bg-stone-950 text-indigo-600 px-3 py-2 rounded-xl">Add Journal</button>
            </div>
          </div>
        </main>
    )
}
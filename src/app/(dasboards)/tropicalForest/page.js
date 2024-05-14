"use client"

export default function TropicalForest(){
    return(
        <main className="min-h-screen w-full flex select-none">
          <div className="md:w-[20%] block bg-green-950 py-6 px-2">
             <h1 className="text-2xl">Welcome to the forest 🌳</h1>
             <ul className="block space-y-8 text-xl cursor-pointer mt-52">
                <li className="hover-underline-animation">Write today's journal</li>
                <li className="hover-underline-animation">View Profile</li>
                <li className="hover-underline-animation">Logout</li>
             </ul>
          </div>
          <div className="md:w-[80%] forestBG flex justify-center items-center">

          </div>
        </main>
    )
}
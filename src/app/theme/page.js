"use client"

import { useRouter } from "next/navigation"

export default function Themes(){

    const router = useRouter();

    return(
    <main className="absolute inset-0 min-h-screen w-full flex justify-center items-center bgTheme blur-background select-none">
      <div className="relative z-10 h-[500px] w-[1000px] rounded-xl flex items-center justify-center">

        <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-6">
        <div className="cardBG1 md:h-60 md:w-96 h-32 w-40 rounded-xl border border-white border-opacity-20 flex justify-center items-center">
            <button onClick={() =>router.push("/tropicalForest")} className="btn-hover-fill text-sm md:text-lg px-4 py-2"> Forests🌳</button>
        </div>
        <div className="cardBG2 md:h-60 md:w-96 h-32 w-40 rounded-xl border border-white border-opacity-20 flex justify-center items-center">
            <button onClick={() =>router.push("/snowMountains")} className="btn-hover-fill text-sm md:text-lg px-4 py-2"> Mountains🗻</button>
        </div>
        <div className="cardBG3 md:h-60 md:w-96 h-32 w-40 rounded-xl border border-white border-opacity-20 flex justify-center items-center">
            <button onClick={() =>router.push("/oceans")} className="btn-hover-fill text-sm md:text-lg px-4 py-2">The Oceans🌊</button>
        </div>
        <div className="cardBG4 md:h-60 md:w-96 h-32 w-40 rounded-xl border border-white border-opacity-20 flex justify-center items-center">
            <button onClick={() =>router.push("/auroras")} className="btn-hover-fill text-sm md:text-lg px-4 py-2">The Auroras✨</button>
        </div>
        </div>
      </div>
    </main>
    )
}
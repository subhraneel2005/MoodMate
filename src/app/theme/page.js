import Link from "next/link";


export default function Themes(){
    return(
    <main className="absolute inset-0 min-h-screen w-full flex justify-center items-center bgTheme blur-background select-none">
      <div className="relative z-10 h-[500px] w-[1000px] rounded-xl flex items-center justify-center">

        <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-6">
        <div className="cardBG1 md:h-60 md:w-96 h-32 w-40 rounded-xl border border-white border-opacity-20 flex justify-center items-center">
            <Link href={"/tropicalForest"}>
            <button className="btn-hover-fill text-sm md:text-lg px-4 py-2"> Forests🌳</button>
            </Link>
        </div>
        <div className="cardBG2 md:h-60 md:w-96 h-32 w-40 rounded-xl border border-white border-opacity-20 flex justify-center items-center">
            <Link href={"/snowMountains"}>
            <button className="btn-hover-fill text-sm md:text-lg px-4 py-2"> Mountains🗻</button>
            </Link>
        </div>
        <div className="cardBG3 md:h-60 md:w-96 h-32 w-40 rounded-xl border border-white border-opacity-20 flex justify-center items-center">
            <Link href={"/oceans"}>
            <button className="btn-hover-fill text-sm md:text-lg px-4 py-2">The Oceans🌊</button>
            </Link>
        </div>
        <div className="cardBG4 md:h-60 md:w-96 h-32 w-40 rounded-xl border border-white border-opacity-20 flex justify-center items-center">
            <Link href={"/auroras"}>
            <button className="btn-hover-fill text-sm md:text-lg px-4 py-2">The Auroras✨</button>
            </Link>
        </div>
        </div>
      </div>
    </main>
    )
}
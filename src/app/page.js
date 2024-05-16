import Link from "next/link";

export default function Home() {
  return (
    <main className="absolute inset-0 min-h-screen w-full flex justify-center items-center bg blur-background select-none p-4">
      <div className="relative z-10 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 md:h-[500px] md:w-[700px] h-[350px] w-auto rounded-xl">
        <nav className="top-0 left-0 py-4 px-2">
          <ul className="flex justify-evenly text-gray-300 text-lg">
            <li className="hover-underline-animation"><Link href={"/"}>Home</Link></li>
            <li className="hover-underline-animation"><Link href={"https://linktr.ee/subhraneel"} target="_blank">About the Developer</Link></li>
            <li className="hover-underline-animation"><Link href={"/auth"}>SignIn</Link></li>
          </ul>
        </nav>
        <div className="block space-y-4 md:mt-28 mt-7 px-8">
          <h1 className="md:text-6xl text-4xl text-green-300 text-center">Mood-Mate</h1>
          <p className="md:text-xl text-lg text-green-400 text-center">Your digital journal. Explore multiple themes based on your mood</p>
          <div className="flex justify-center items-center py-6">
          <Link href={"/theme"}>
          <button className="btn-hover-fill font-bold px-4 py-2 rounded-lg border-2 border-green-800  cursor-pointer text-green-200">Explore all themes</button>
          </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

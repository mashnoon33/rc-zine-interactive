import Link from "next/link"
export default function LandingPage() {
    return (
        <div className="flex flex-col md:flex-row w-full bg-gray-200 h-screen items-center justify-center">
            <Link href="/landing/fortunator" className="group w-full md:w-1/2 h-full bg-rose-300 flex items-center justify-center transition-transform transform hover:scale-105 hover:shadow-lg">
                <h1 className="text-6xl font-extrabold font-sans group-hover:text-white">The Fortunator</h1>
            </Link>
            <Link href="/landing/storytime" className="group w-full md:w-1/2 h-full bg-green-300 flex items-center justify-center transition-transform transform hover:scale-105 hover:shadow-lg">
                <h1 className="text-6xl font-extrabold font-sans group-hover:text-white">Storytime</h1>
            </Link>
        </div>
    );
}
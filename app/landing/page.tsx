import Link from "next/link"

export default function LandingPage() {
    
    return (
        <div className="flex flex-col md:flex-row w-full bg-white h-screen items-center justify-center">
            <Link href="/landing/fortunator" className="w-full md:w-1/2 h-full bg-red-500 flex items-center justify-center">
                <h1 className="text-4xl font-bold">The fortunator</h1>
            </Link>
            <Link href="/landing/storytime" className="w-full md:w-1/2 h-full bg-blue-500 flex items-center justify-center">
                <h1 className="text-4xl font-bold">Storytime</h1>
            </Link>
        </div>
    );
}
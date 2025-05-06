import Link from "next/link"

export default function LandingPage() {
    return (
        <div className="flex flex-col w-full h-screen bg-gray-200">
            {/* Hero Section */}
            <div className="w-full h-[20vh] px-4 text-center bg-white shadow-md flex items-center justify-center">
                <div className="max-w-4xl">
                    <Link href="/" className="flex items-center justify-center gap-4 mb-2">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 hover:text-gray-700 transition-colors">
                            RC Interactive Zine
                        </h1>
                    </Link>
                    <p className="text-lg md:text-xl text-gray-600">
                        Choose your adventure,{' '}
                        <Link href="/story-so-far" className="text-blue-600 hover:text-blue-700 underline">
                            read the live story
                        </Link>
                        , or{' '}
                        <Link href="/dashboard" className="text-purple-600 hover:text-purple-700 underline">
                            view live survey results
                        </Link>
                    </p>
                </div>
            </div>

            {/* Adventure Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-[80vh]">
                <Link 
                    href="/fortunator" 
                    className="group bg-rose-300 flex items-center justify-center transition-transform transform hover:scale-105 hover:shadow-lg h-[40vh] md:h-full"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold font-sans group-hover:text-white">🔮 The Fortunator</h2>
                </Link>
                <Link 
                    href="/storytime" 
                    className="group bg-green-300 flex items-center justify-center transition-transform transform hover:scale-105 hover:shadow-lg h-[40vh] md:h-full"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold font-sans group-hover:text-white">✍️ Storytime</h2>
                </Link>
            </div>
        </div>
    );
}

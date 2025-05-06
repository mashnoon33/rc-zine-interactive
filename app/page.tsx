import Link from "next/link"

export default function LandingPage() {
    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-200">
            {/* Hero Section */}
            <div className="w-full py-12 px-4 text-center bg-white shadow-md">
                <div className="max-w-4xl mx-auto">
                    <Link href="/" className="flex items-center justify-center gap-4 mb-4">
                        {/* Logo placeholder */}
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🎨</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 hover:text-gray-700 transition-colors">
                            RC Interactive Zine
                        </h1>
                    </Link>
                    <p className="text-xl md:text-2xl text-gray-600 mb-6">
                        Choose your adventure or{' '}
                        <Link href="/dashboard" className="text-purple-600 hover:text-purple-700 underline">
                            View live results
                        </Link>
                    </p>
                </div>
            </div>

            {/* Adventure Selection */}
            <div className="flex flex-col md:flex-row flex-1">
                <Link 
                    href="/fortunator" 
                    className="group w-full md:w-1/2 bg-rose-300 flex items-center justify-center transition-transform transform hover:scale-105 hover:shadow-lg"
                >
                    <h2 className="text-6xl font-extrabold font-sans group-hover:text-white">🔮 The Fortunator</h2>
                </Link>
                <Link 
                    href="/storytime" 
                    className="group w-full md:w-1/2 bg-green-300 flex items-center justify-center transition-transform transform hover:scale-105 hover:shadow-lg"
                >
                    <h2 className="text-6xl font-extrabold font-sans group-hover:text-white">✍️ Storytime</h2>
                </Link>
            </div>
        </div>
    );
}

export default function LandingPage() {
    return (
        <div className="w-full h-screen relative overflow-hidden">

            
            <video
                src="/720p.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />

            
            <div className="absolute inset-0 bg-black/50"></div>

            
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">

                <div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Welcome to DYNAMATIC TECHNOLOGIES
                    </h1>

                    <p className="text-lg md:text-2xl mb-8">
                        Your one-stop shop for all your computer needs
                    </p>

                    <a
                        href="/products"
                        className="inline-block bg-blue-600 hover:bg-blue-700
                                   text-white font-semibold px-8 py-3
                                   rounded-lg transition duration-300"
                    >
                        Shop Now
                    </a>
                </div>

            </div>

        </div>
    );
}
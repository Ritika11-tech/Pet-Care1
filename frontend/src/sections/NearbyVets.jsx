import { motion } from 'framer-motion'
import { Navigation, Stethoscope } from 'lucide-react'

export default function NearbyVets() {
    const openNearbyVets = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                const mapsUrl = `https://www.google.com/maps/search/veterinary+clinics/@${latitude},${longitude},15z`
                window.location.href = mapsUrl
            },
            (error) => {
                window.location.href = 'https://www.google.com/maps/search/veterinary+clinics+near+me'
            }
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 bg-white rounded-3xl shadow-soft-lg overflow-hidden border border-green-100"
        >
            <div className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                        <Stethoscope className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-xl text-gray-800">See Nearby Vets</h3>
                        <p className="text-sm text-gray-500">Find veterinary clinics and hospitals near you</p>
                    </div>
                </div>

                
                <div
             
                     className="relative w-full h-64 sm:h-80 bg-gradient-to-br from-green-100 via-blue-50 to-emerald-100 rounded-2xl overflow-hidden cursor-pointer group border-2 border-green-200 hover:border-green-400 transition-all"
        >
                    {/* Real Map Background Image */}
                    <img
                        src="https://mt1.google.com/vt/lyrs=m&x=0&y=0&z=15&w=800&h=400"
                        alt="Map showing nearby veterinarians"
                        className="absolute inset-0 w-full h-full object-cover"
                        
                    />

                    {/* Map Overlay for better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* User Location - Blue Arrow (KEEPING THIS AS REQUESTED) */}
                    <div 
                           onClick={openNearbyVets}
                           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="relative">
                            {/* Pulse rings */}
                            <div className="absolute -inset-6 bg-blue-500/20 rounded-full animate-ping" />
                            <div className="absolute -inset-3 bg-blue-500/30 rounded-full animate-pulse" />

                            {/* Blue Arrow Marker */}
                            <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white">
                                    <Navigation className="w-7 h-7 text-white" />
                                </div>
                                {/* Pin pointer */}
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-10 border-l-transparent border-r-transparent border-t-blue-600" />
                            </div>

                            
                        </div>
                    </div>

                    {/* Distance radius circles */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 border-2 border-blue-400/40 rounded-full pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-blue-400/25 rounded-full pointer-events-none" />

                    {/* Hover Overlay */}
                    <div 
                    onClick={openNearbyVets}
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <div className="bg-white rounded-2xl px-6 py-4 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 z-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Navigation className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">Open Google Maps</p>
                                    <p className="text-sm text-gray-500">Find nearby veterinarians</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
            <span className="text-red-500">📍</span>
            <span className="text-sm font-semibold text-gray-700">Tap to see vets</span>
          </div>


                </div>
                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                        <span className="text-sm text-gray-600">24/7 Emergency</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                        <span className="text-sm text-gray-600">Vet Clinic</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                        <span className="text-sm text-gray-600">Animal Hospital</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded-full" />
                        <span className="text-sm text-gray-600">Pet Services</span>
                    </div>
                </div>

                {/* Direct Button */}
                <button
                    onClick={openNearbyVets}
                    className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-200 flex items-center justify-center gap-3"
                >
                    <Navigation className="w-5 h-5" />
                    <span>Find Vets in Google Maps</span>
                </button>
            </div>
        </motion.div>
    )
}



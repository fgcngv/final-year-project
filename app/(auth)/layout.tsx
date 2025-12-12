"use client"


import Image from "next/image";
import { motion } from "framer-motion";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#fdfaf6]">
      
      {/* Left: Auth Form Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center w-full md:w-1/2 p-8"
      >
        <div className="w-full  relative justify-center items-center  shadow-xl rounded-xl p-8 border border-gray-100">
        <Image
          src="/cup_coffee.png"
          alt="Green Coffee Art"
          fill
          className="object-cover opacity-90 rounded-2xl"
        />
        <div className="absolute inset-0 rounded-2xl bg-black/50"></div>
          {children}
        </div>
      </motion.div>

      {/* Right: Image Panel */}
      <div className="hidden md:flex w-1/2 relative  justify-center items-center bg-[#ece3d8]">
        <Image
          src="/green_coffee.png"
          alt="Green Coffee Art"
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Text Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className=" text-green-700 bg-white/50 font-bold bottom-10 left-10 rounded drop-shadow-lg"
        >
          <h1 className="text-4xl font-bold mb-2 p-5">Ethiopian Green Coffee</h1>
          <p className="text-lg">
            Pure. Organic. Authentic. From Ethiopia to the world.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default AuthLayout;

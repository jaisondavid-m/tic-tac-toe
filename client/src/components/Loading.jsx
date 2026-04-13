import React from "react"
import { motion } from "framer-motion"
import { Gamepad2 } from "lucide-react"

function Loading() {

    const cells = Array(9).fill(null)
    
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 overflow-hidden">
            {[...Array(6)].map((_,i) => (
                <motion.div
                    key={i}
                    className="absolute text-white/10"
                    initial={{
                        y: 100,
                        x: Math.random()*400 - 200,
                        opacity: 0,
                        rotate: 0,
                    }}
                    animate={{
                        y: -500,
                        opacity: [ 0 , 0.3 , 0],
                        rotate: 360,
                    }}
                    transition={{
                        duration: 8 + i*2,
                        repeat: Infinity,
                        delay: i*1.2,
                        ease:"linear",
                    }}
                    style={{
                        left: `${10+i*15}`,
                        fontSize: `${30+i*8}px`
                    }}
                >
                    <Gamepad2/>
                </motion.div>
            ))}
            <div className="absolute w-80 h-80 bg-white/5 rounded-full blur-3xl animate-plus"></div>
            <motion.h1
                initial={{ opacity: 0 , y: -20 }}
                animate={{ opacity: 1 , y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-extrabold tracking-widest mb-10 z-10"
            >
                TIC TAC TOE
            </motion.h1>
            <div className="grid grid-cols-3 gap-3 z-10">
                {cells.map((_,i)=>(
                    <motion.div
                        key={i}
                        initial={{ scale: 0.8 , opacity: 0.2 }}
                        animate={{
                            scale: [ 0.8 , 1.1 , 1 ],
                            opacity: [ 0.2 , 1, 0.4 ]
                        }} 
                        transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            delay: i*0.08,
                        }}
                        className="w-16 h-16 md:w-20 md:h-20 border-2 border-white rounded-xl flex items-center justify-center text-2xl font-bold"
                    >
                        { i%2 === 0 ? "X" : "O" }
                    </motion.div>
                ))}
            </div>
            <motion.p
                initial={{opacity:0}}
                animate={{opacity: [0.2,1,0.2] }}
                transition={{ repeat: Infinity , duration: 1.5 }}
                className="mt-8 text-sm md:text-base tracking-[0.4em] uppercase text-white/70 z-10"
            >
                Loading...
            </motion.p>
        </div>
    )

}

export default Loading
import React , { useState } from "react"
import { Link , useLocation } from "react-router-dom"
import { Menu , X , Gamepad2 } from "lucide-react"
import { motion , AnimatePresence } from "framer-motion"

function NavBar() {
    const [ open , setOpen ] = useState(false)
    const location = useLocation()

    const navLinks = [
        { name: "Home" , path: "/" },
        { name: "Play with Bot" , path: "/bot" },
    ]

    const isActive = ( path ) => location.pathname === path

    return (
        <motion.header
            initial = {{ y: -80 , opacity: 0 }}
            animate = {{ y: 0 , opacity: 1 }}
            transition = {{ duration: 0.6 , ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2" >
                        <motion.div
                            whileHover={{ rotate: 10 , scale: 1.1 }}
                            transition={{ type: "spring" , stiffness: 300 }}
                            className="text-white"
                        >
                            <Gamepad2 size={24} />
                        </motion.div>
                        <span
                            className="text-white font-bold text-lg tracking-wide"
                        >
                            Tic Tac Toe
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-3">
                        {navLinks.map((item,i) => (
                            <motion.div
                                key={item.path}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i*0.1 }}
                            >
                                <Link
                                    to={item.path}
                                    className={`group relative px-4 py-2 text-sm font-medium transition -all duration-300 ${
                                        isActive(item.path) ? "text-white" : "text-white/70 hover:text-white"
                                    }`}
                                >
                                    {item.name}
                                    {!isActive(item.path) && (
                                        <span className={`absolute left-0 -bottom-1 h-[2px] rounded-full bg-white transition-all duration-300 ${
                                            isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                                        }`}></span>
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                    <motion.div
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:block"
                    >
                        <Link
                            to="/bot"
                            className="px-5 py-2 rounded-full bg-white text-black font-semibold text-sm shadow-lg"
                        >
                            Start Game
                        </Link>
                    </motion.div>
                    <button
                        onClick={() => setOpen(!open) }
                        className="md:hidden text-white"
                    >
                        { open ? <X size={24} /> : <Menu size={24} /> }
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 , height: 0 }}
                        animate={{ opacity: 1 , height: "auto" }}
                        exit={{ opacity: 0 , height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="md:hidden overflow-hidden bg-black/95 border-t border-white/10"
                    >
                        <div
                            className="px-6 py-4 flex flex-col gap-3 justify-center"
                        >
                            {navLinks.map((item,i) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ x: -30 , opacity: 0 }}
                                    animate={{ x: 0 , opacity: 1 }}
                                    transition={{ delay: i*0.08 }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={() => setOpen(false)}
                                        className={`group relative block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                            isActive(item.path) ? "text-white bg-white/10 " : " text-white/70 hover:text-white hover:border-white/5"
                                        }`}
                                    >
                                    {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Link
                                    to="/bot"
                                    onClick={() => setOpen(false)}
                                    className="block text-center px-4 py-3 rounded-xl bg-white text-black font-semibold"
                                >
                                    Start Game
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}

export default NavBar
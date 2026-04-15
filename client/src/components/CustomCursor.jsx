import React, { useEffect, useRef, useState } from "react"

function CustomCursor() {

    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const trails = useRef([])
    const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    const pos = useRef({ ...mouse.current })
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        document.body.classList.add('cursor-none')
        return () => document.body.classList.remove('cursor-none')
    }, [])

    useEffect(() => {
        const spawn = (x, y) => {
            for (let i = 0; i < 2; i++) {
                const el = document.createElement('div')
                el.className = `fixed w-4 h-4 bg-white rounded-sm pointer-events-none z-[99999] mix-blend-difference shadow-[0_0_12px_rgba(255,255,255,0.8)]`
                document.body.appendChild(el)
                trails.current.push({ el, x: x - 4 + Math.random() * 8, y: y - 4 + Math.random() * 8, life: 1 })
            }
        }
        const move = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY }
            spawn(e.clientX, e.clientY)
        }

        const down = () => setClicked(true)
        const up = () => setClicked(false)

        window.addEventListener('mousemove', move)
        window.addEventListener('mousedown', down)
        window.addEventListener('mouseup', up)

        let raf
        const animate = () => {
            pos.current.x += (mouse.current.x - pos.current.x) * 0.30
            pos.current.y += (mouse.current.y - pos.current.y) * 0.30
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mouse.current.x - 6}px,${mouse.current.y - 6}px) scale(${clicked ? 0.8 : 1})`
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${pos.current.x - 22}px,${pos.current.y - 22}px) scale(${clicked ? 1.8 : 1})`
            }
            trails.current = trails.current.filter((t) => {
                t.life -= 0.03
                t.el.style.opacity = t.life
                t.el.style.transform = `translate(${t.x}px,${t.y}px) scale(${1 - t.life}) rotate(${(1 - t.life) * 180}deg)`
                if (t.life <= 0) {
                    t.el.remove()
                    return false
                }
                return true
            })
            raf = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('mousemove',move)
            window.removeEventListener('mousedown',down)
            window.removeEventListener('mouseup',up)
        }

    },[])

    return (
        <div className="block">
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-16 h-16 rounded-full border-2 border-black pointer-events-none z-[99999] mix-blend-difference shadow-[0_0_20px_rgba(255,255,255,0.8),inset_0_0_12px_rgba(255,255,255,0.25)]"
            />
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-5 h-5 rounded-full bg-black pointer-events-none z-[99999] mix-blend-difference shadow-[0_0_10px_rgba(255,255,255,0.9)] transition-transform duration-75 "
            />
        </div>
    )

}

export default CustomCursor
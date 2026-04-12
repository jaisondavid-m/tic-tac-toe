import React , { useState } from "react"

const difficulties = [ "EASY" , "MEDIUM" , "HARD" ]

function DifficultySelect({ value , onChange }) {

    const [ open , setOpen ] = useState(false)

    return (
        <div className="relative w-full mb-4">
            <button
                type="button"
                onClick={()=>setOpen(!open)}
                className="w-full px-4 py-3 rounded-xl border bg-white text-sm font-medium flex justify-between items-center shadow-sm hover:shadow-md transition"
            >
                {value}
                <span>▾</span>
            </button>
            { open && (
                <div className="absolute w-full mt-2 bg-white border rounded-xl shadow-lg overflow-hidden z-50">
                    {difficulties.map((level) => (
                        <div
                            key={level}
                            onClick={() => {
                                onChange(level)
                                setOpen(false)
                            }}
                            className={`px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 ${
                                value === level ? "bg-gray-100 font-semibold" : ""
                            }`}
                        >
                            {level}
                        </div>
                    ))}
                </div>
            ) }
        </div>
    )
}

export default DifficultySelect
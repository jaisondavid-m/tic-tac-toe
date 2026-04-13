import React , { useMemo } from "react"

function generateDays(year) {
    const start = new Date(year,0,1)
    const end = new Date(year,11,31)
    const arr=[]
    let d = new Date(start)
    while( d <= end ) {
        arr.push(new Date(d))
        d.setDate(d.getDate()+1)
        return arr
    }
}

function getData() {
    const raw = localStorage.getItem("ttt_history")
    return raw ? JSON.parse(raw) : {}
}

export default function StreakPage(){
    const year = new Date().getFullYear()
    const days = useMemo(()=>generateDays(year),[year])
    const data = getData()
    const total = Object.values(data).reduce((a,b)=>a+b,0)
    const today = new Date().toISOString().slice(0,10)
    const streak = useMemo(()=>{
        let s = 0
        let d = new Date()
        while(true) {
            const key = d.toISOString().slice(0,10)
            if(data[key]>0){
                s++;
                d.setDate(d.getDate()-1)
            }
            else {
                break
            }
        }
    })

    return (
        <div className="min-h-screen mt-12 bg-black text-white p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">Game Streak</h1>
                <p className="text-zinc-400 mb-2">Play Daily and keep your streak alive.</p>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-zinc-900 rounded-2xl p-4">
                        <div className="text-zinc-400 text-sm">Current Streak</div>
                        <div className="text-3xl font-bold">{streak} days</div>
                    </div>
                    <div className="bg-zinc-900 rounded-2xl p-4">
                        <div className="text-zinc-400 text-sm">Games This Year</div>
                        <div className="text-3xl font-bold">{total}</div>
                    </div>
                    <div className="bg-zinc-900 rounded-2xl p-4">
                        <div className="text-zinc-400 text-sm">Today</div>
                        <div className="text-3xxl font-bold">{data[today] || 0}</div>
                    </div>
                </div>
                <div className="bg-zinc-900 rounded-2xl p-5">
                    <div>
                        {days.map((day,i)=>{
                            const key = day.toISOString().slice(0,10)
                            const count = data[key] || 0
                            const shade = count === 0 ? "bg-white/10" : count < 3 ? "bg-white/40" : count < 6 ? "bg-white/70" : "bg-white"
                            return (
                                <div key={i} title={`${key}: ${count} games`} className={`w-3 h-3 rounded-sm ${shade}`} ></div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )

}
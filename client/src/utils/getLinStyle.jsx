import React from "react"

function getLineStyle(line) {

    if(!line) return ""

    const key = line.join(",")

    const map = {

        "0,1,2" : "top-[42px] left-0 w-full h-1",
        "3,4,5" : "top-1/2 -translate-y-1/2 left-0 w-full h-1",
        "6,7,8" : "bottom-[42px] left-0 w-full h-1",

        "0,3,6" : "left-[42px] top-0 h-full w-1",
        "1,4,7" : "left-1/2 -translate-x-1/2 top-0 h-full w-1",
        "2,5,8" : "right-[42px] top-0 h-full w-1",

        "0,4,8" : "left-0 top-0 w-[140%] h-1 rotate-45 origin-left",
        "2,4,6" : "right-0 top-0 w-[140%] h-1 -rotate-45 origin-right"
    }

    return map[key] || ""

}

export default getLineStyle
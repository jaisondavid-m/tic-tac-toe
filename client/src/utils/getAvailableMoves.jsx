import React from "react"

function getAvailableMoves(board) {
    return board.map(( v,i ) => (v === null ? i : null ) ).filter(v => v !== null)
}

export default getAvailableMoves
import { useState, useRef, useEffect } from "react";
import Cell from "./Cell"
import moveFocus from "../utility/moveFocus";
import defCells from "../utility/makeCells";
import { cellInterface } from "../utility/makeCells";
import backtracking from "../utility/backtracking";

export default function() {

    const [currentFocus, setCurrentFocus] = useState<string>('1_1')
    const [cells, setCells] = useState<cellInterface>(defCells)

    useEffect(() => {
        function handleBoardNav(e: KeyboardEvent) {
            setCurrentFocus(prev => moveFocus(prev, e.key))
        }
        document.addEventListener('keydown', handleBoardNav)
        return () => document.removeEventListener('keydown', handleBoardNav)
    }, [])

    function handleInput() {
        setCurrentFocus(prev => moveFocus(prev, 'next'))
    }


    return(
        <div className="grid grid-areas-mainBoard">
            {Object.entries(cells).map( cell => (
                <Cell area={cell} key={cell[0]} currentFocus={currentFocus} handleInput={handleInput} setCurrentFocus={setCurrentFocus} setCells={setCells}/>
            ))}
            <button onClick={() => backtracking(cells)} className="px-8 py-2 rounded-full bg-green-400 absolute -top-1">Check</button>
        </div>
    )
}
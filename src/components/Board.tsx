import { useState, useRef, useEffect } from "react";
import Cell from "./Cell"
import moveFocus from "../utility/moveFocus";
import defCells from "../utility/makeCells";
import { cellInterface } from "../utility/makeCells";
import backtracking from "../utility/backtracking";
import startSolveBySteps from "../utility/solveBySteps";

export default function() {

    const [currentFocus, setCurrentFocus] = useState<string>('1_1')
    const [cells, setCells] = useState<cellInterface>(defCells)
    const [calculatingCell, setCalculatingCell] = useState<string>('')
    const [collidingCells, setcollidingCells] = useState<string[]>([])
    const [validated, setValidated] = useState<boolean>(false)
    const originalBoard = useRef<cellInterface>(defCells)

    useEffect(() => {
        function handleBoardNav(e: KeyboardEvent) {
            setCurrentFocus(prev => moveFocus(prev, e.key))
        }
        document.addEventListener('keydown', handleBoardNav)
        return () => document.removeEventListener('keydown', handleBoardNav)
    }, [])



    async function handleSolveBySteps() {
        originalBoard.current = {...cells}
        let isSolved = await startSolveBySteps(cells, setCells, setCalculatingCell, setcollidingCells, setValidated)
        if(isSolved) console.log('solved')
        else console.log('not solved')
    }


    return(
        <div className="grid grid-areas-mainBoard">
            {Object.entries(cells).map( cell => (
                <Cell isOriginal={originalBoard.current[cell[0]] !== ''} validated={validated} isCollading={collidingCells.includes(cell[0])} isCalculating={calculatingCell === cell[0]} area={cell} key={cell[0]} currentFocus={currentFocus} setcollidingCells={setcollidingCells} setCurrentFocus={setCurrentFocus} setCells={setCells} cells={cells}/>
            ))}
            <button onClick={() => setCells(prev => backtracking(prev) )} className="px-8 py-2 rounded-full bg-green-400 absolute top-1 left-0">Solve</button>
            <button onClick={handleSolveBySteps} className="px-8 py-2 rounded-full bg-green-400 absolute top-1 right-0">Step by step</button>
        </div>
    )
}
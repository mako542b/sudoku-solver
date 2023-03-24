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
    const [phase, setPhase] = useState<'initial' | 'started' | 'stopped'>('initial')
    const originalBoard = useRef<cellInterface>(defCells)
    const aborted = useRef<boolean>(false);
    const delay = useRef<number>(500);

    useEffect(() => {
        function handleBoardNav(e: KeyboardEvent) {
            setCurrentFocus(prev => moveFocus(prev, e.key))
        }
        document.addEventListener('keydown', handleBoardNav)
        return () => document.removeEventListener('keydown', handleBoardNav)
    }, [])


    
    async function handleSolveBySteps() {
        setPhase('started')
        originalBoard.current = {...cells}
        let isSolved = await startSolveBySteps(cells, originalBoard.current,setCells, setCalculatingCell, setcollidingCells, setValidated, aborted, delay, '1_1')
        if(isSolved) console.log('solved')
        else console.log('not solved')
    }

    async function resumeExec() {
        aborted.current = false
        setPhase('started')
        let isSolved = await startSolveBySteps(cells, originalBoard.current,setCells, setCalculatingCell, setcollidingCells, setValidated, aborted, delay, calculatingCell)
        if(isSolved) console.log('solved')
        else console.log('not solved')
    }


    function handleAbord() {
        setPhase('stopped')
        aborted.current = true
    }

    function reset() {
        setCells(defCells)
        setcollidingCells([])
        setCalculatingCell('')
        setPhase('initial')
    }

    function setRandomBoard() {
        
    }


    return(
        <div className="grid grid-cols-mainGrid gap-x-6 place-content-center place-items-center">
            <div className="grid grid-areas-mainBoard">
                {Object.entries(cells).map( cell => (
                    <Cell isOriginal={originalBoard.current[cell[0]] !== ''} validated={validated} isCollading={collidingCells.includes(cell[0])} isCalculating={calculatingCell === cell[0]} area={cell} key={cell[0]} currentFocus={currentFocus} setcollidingCells={setcollidingCells} setCurrentFocus={setCurrentFocus} setCells={setCells} cells={cells}/>
                ))}
            </div>
            <div className="grid gap-y-2">
                {phase === 'initial' && <button onClick={() => setCells(prev => backtracking(prev) )} className="button">Solve</button>}
                {phase === 'initial' && <button onClick={handleSolveBySteps} className="button">Step by step</button>}
                {phase === 'initial' && <button onClick={setRandomBoard} className="button">Generate</button>}
                {phase === 'started' && <button onClick={handleAbord} className="button">Abort</button>}
                {phase === 'stopped' && <button onClick={resumeExec} className="button">Resume exec</button>}
                {phase === 'stopped' && <button onClick={reset} className="button">Reset</button>}
                <input type='range' min={0} max={800} defaultValue={400} onChange={(e) => delay.current = +e.target.value} className="" />
            </div>
        </div>
    )
}
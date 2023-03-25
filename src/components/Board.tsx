import { useState, useRef, useEffect } from "react";
import Cell from "./Cell"
import moveFocus from "../utility/moveFocus";
import defCells from "../utility/makeCells";
import { cellInterface } from "../utility/makeCells";
import backtracking from "../utility/backtracking";
import startSolveBySteps from "../utility/solveBySteps";
import generateBoard from "../utility/generateBoard";
import checkBoard from '../utility/checkBoard'


export default function() {
    
    const [currentFocus, setCurrentFocus] = useState<string>('1_1')
    const [cells, setCells] = useState<cellInterface>(defCells)
    const [calculatingCell, setCalculatingCell] = useState<string>('')
    const [collidingCells, setcollidingCells] = useState<string[]>([])
    const [validated, setValidated] = useState<boolean>(false)
    const [phase, setPhase] = useState<'initial' | 'started' | 'stopped' | 'ended'>('initial')
    // const [error, setError] = useState<string | null>(null)
    const originalBoard = useRef<cellInterface>(defCells)
    const aborted = useRef<boolean>(false);
    const delay = useRef<number>(400);

    useEffect(() => {
        function handleBoardNav(e: KeyboardEvent) {
            setCurrentFocus(prev => moveFocus(prev, e.key))
        }
        document.addEventListener('keydown', handleBoardNav)
        return () => document.removeEventListener('keydown', handleBoardNav)
    }, [])


    
    async function handleSolveBySteps() {
        if(!checkBoard(cells)) return window.alert('Invalid board')
        aborted.current = false
        setPhase('started')
        originalBoard.current = {...cells}
        let isSolved = await startSolveBySteps(cells, originalBoard.current,setCells, setCalculatingCell, setcollidingCells, setValidated, aborted, delay, '1_1')
        
        if(isSolved) {
            setPhase('ended')
            console.log('solved')
        }
        else console.log('not solved')
    }

    async function resumeExec() {
        aborted.current = false
        setPhase('started')
        let isSolved = await startSolveBySteps(cells, originalBoard.current,setCells, setCalculatingCell, setcollidingCells, setValidated, aborted, delay, calculatingCell)
        if(isSolved){
            setPhase('ended')
            console.log('solved')
        }
        else console.log('not solved')
    }


    function handleAbord() {
        setPhase('stopped')
        aborted.current = true
    }

    function reset() {
        setCells(defCells)
        originalBoard.current = defCells
        aborted.current = true
        setcollidingCells([])
        setCalculatingCell('')
        setPhase('initial')
    }

    function setRandomBoard() {
        setCells(generateBoard())
    }

    function fastSolve(){
        setPhase('started')
        setCells(prev => backtracking(prev))
        setPhase('ended')
    }


    return(
        <div className="grid md:grid-flow-col gap-y-3 gap-x-6 place-content-center place-items-center ">
            <div className="grid grid-areas-mainBoard">
                {Object.entries(cells).map( cell => (
                    <Cell isOriginal={originalBoard.current[cell[0]] !== ''} validated={validated} isCollading={collidingCells.includes(cell[0])} isCalculating={calculatingCell === cell[0]} area={cell} key={cell[0]} currentFocus={currentFocus} setcollidingCells={setcollidingCells} setCurrentFocus={setCurrentFocus} setCells={setCells} cells={cells}/>
                ))}
            </div>
            <div className="grid gap-y-2 justify-self-stretch text-sm md:text-lg">
                {phase === 'initial' && <button onClick={fastSolve} className="button">Quick Solve</button>}
                {phase === 'initial' && <button onClick={handleSolveBySteps} className="button">Step by step</button>}
                {phase === 'initial' && <button onClick={setRandomBoard} className="button">Generate</button>}
                {phase === 'started' && <button onClick={handleAbord} className="button">Pause</button>}
                {phase === 'stopped' && <button onClick={resumeExec} className="button">Resume</button>}
                {phase !== 'started' && <button onClick={reset} className="button">Reset</button>}
                {phase === 'started' && (<div className="grid md:w-40">
                    <input id="delay" type='range' min={10} max={800} defaultValue={400} onChange={(e) => delay.current = +e.target.value} className="h-6" />
                    <div className="flex justify-between">
                        <label htmlFor="delay">slower</label>
                        <label htmlFor="delay">faster</label>
                    </div>
                </div>)}
            </div>
        </div>
    )
}
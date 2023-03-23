import { useState, useRef, useEffect } from "react"
import getBorderClasses from "../utility/getBorderClasses"
import moveFocus from "../utility/moveFocus"
import { cellInterface } from "../utility/makeCells"
import checkBoard from '../utility/checkBoard'


interface props {
    setCurrentFocus: React.Dispatch<React.SetStateAction<string>>
    setCells : React.Dispatch<React.SetStateAction<cellInterface>>
    setcollidingCells: React.Dispatch<React.SetStateAction<string[]>>
    currentFocus: string | null
    area : string[]
    isCalculating: boolean
    isCollading: boolean
    validated: boolean
    isOriginal: boolean
    cells: cellInterface
}

function Cell({area, setCurrentFocus, currentFocus, setCells, isCalculating, isCollading, validated, isOriginal, cells, setcollidingCells}: props) {

    const ref = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        let pointer: number
        if(area[0] === currentFocus) {
            ref?.current?.focus()
            pointer = setTimeout(() => ref?.current?.select(),0)
        }
        return () => clearInterval(pointer)
    }, [currentFocus])

    const classes = getBorderClasses(area[0])

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
        setCurrentFocus(() => area[0])
        ref?.current?.select()
    }

    function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(!/^[1-9]$/.test(e.target.value) && e.target.value.trim() !== '') return
        const newCells = {...cells, [area[0]]: e.target.value.trim()}
        setCells(newCells)
        if(checkBoard(newCells, setcollidingCells)){
            setCurrentFocus(prev => moveFocus(prev, 'next'))
        } else {
            ref?.current?.select()
        }
    }

    return(
        <div className={`cell grid-${area} ${classes}`}>
            <input ref={ref} className={`w-full h-full text-center ${(isCalculating && validated) ? 'bg-green-700' : isCalculating ? 'bg-blue-700' : isCollading ? 'bg-red-500' : isOriginal ? 'bg-orange-300' : null}`} type="string" value={area[1]} onInput={handleValueChange} onFocus={handleFocus}/>
        </div>
    )
}
export default Cell
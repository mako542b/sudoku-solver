import { useState, useRef, useEffect } from "react"
import getBorderClasses from "../utility/getBorderClasses"
import moveFocus from "../utility/moveFocus"
// import { cellInterface } from "./Board"

interface props {
    setCurrentFocus: React.Dispatch<React.SetStateAction<string>>
    currentFocus: string | null
    area : string[]
    handleInput : () => void
}

function Cell({area, setCurrentFocus, currentFocus}: props) {

    const [value, setValue] = useState<string>('')
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
        // ref?.current?.focus()
        ref?.current?.select()
    }

    function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(!/^[1-9]$/.test(e.target.value) && e.target.value.trim() !== '') return // window.alert('Value must be a number 1-9')
        setValue(e.target.value.trim())
        setCurrentFocus(prev => moveFocus(prev, 'next'))
    }

    return(
        <div className={`cell grid-${area} ${classes}`}>
            <input ref={ref} className="w-full h-full text-center" type="string" value={value} onInput={handleValueChange} onFocus={handleFocus}/>
        </div>
    )
}
export default Cell
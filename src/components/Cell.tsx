import { useState } from "react"
import getBorderClasses from "../utility/getBorderClasses"


export default function({area}: {area:string}) {

    const [value, setValue] = useState<string>('')

    const classes = getBorderClasses(area)

    function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(!/^[1-9]$/.test(e.target.value) && e.target.value !== '') return window.alert('Value must be a number 1-9')
        setValue(e.target.value)
    }

    return(
        <div className={`cell grid-${area} ${classes}`}>
            <input className="w-full h-full text-center" type="string" value={value} onChange={handleValueChange}/>
        </div>
    )
}


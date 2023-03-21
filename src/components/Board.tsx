import Cell from "./Cell"

export default function() {

    const cells = []
    for(let i = 1; i <= 9; i++){
        for(let j = 1; j <= 9; j++){
            let newCell = i + '_' + j
            cells.push(newCell)
        }
    }

    return(
        <div className="grid grid-areas-mainBoard">
            {cells?.length > 0 && cells.map(cell => (
                <Cell area={cell} key={cell} />
            ))}
        </div>
    )
}
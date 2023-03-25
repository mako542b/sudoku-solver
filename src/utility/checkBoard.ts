import { cellInterface } from "./makeCells";


export default function validateBoard(board:cellInterface, setcollidingCells?: React.Dispatch<React.SetStateAction<string[]>>) {

    const collisions : string[] = []
    for(let [key, value] of Object.entries(board)){
        if(!validate(key, value, board)) collisions.push(key)
    }
    setcollidingCells?.(collisions)
    return collisions.length === 0

}


function validate(cellAdress: string, val: string, board:cellInterface) {
    if(val === '') return true
    let [row, col] = cellAdress.split('_')

    for(let i = 1; i <= 9; i++){

        let rowAdjCell = row + '_' + i
        if(board[rowAdjCell] === val && cellAdress !== rowAdjCell) return false
        let colAdjCell = i + '_' + col
        if(board[colAdjCell] === val && cellAdress !== colAdjCell) return false
    }

    let rowStart = (Math.floor((+row - 1) / 3) * 3) + 1
    let colStart = (Math.floor((+col - 1) / 3) * 3) + 1
    for(let i = rowStart; i < rowStart + 3; i++){
        for(let j = colStart; j < colStart + 3; j++){
            let groupCellAdress = i + '_' + j
            if(cellAdress === groupCellAdress) continue
            if(board[groupCellAdress] === val) return false
        }
    }
    return true
}
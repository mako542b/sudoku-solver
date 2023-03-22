import { cellInterface } from "./makeCells";

export default function(board: cellInterface) {

    let boardArr = Object.entries(board)

    for(let entry of boardArr){
        console.log(validate(entry, board))
    }

}

function validate(cell: string[], board:cellInterface) {
    let [row, col] = cell[0].split('_')
    for(let i = 1; i <= 9; i++){

        if(cell[1] === '') continue

        let rowAdjCell = row + '_' + i
        let colAdjCell = i + '_' + col


        if(board[rowAdjCell] === cell[1] && cell[0] !== rowAdjCell) return false
        if(board[colAdjCell] === cell[1] && cell[0] !== colAdjCell) return false
    }
    let rowStart = (Math.floor((+row - 1) / 3) * 3) + 1
    let colStart = (Math.floor((+col - 1) / 3) * 3) + 1
    for(let i = rowStart; i < rowStart + 3; i++){
        if(cell[1] === '') continue

        for(let j = colStart; j < colStart + 3; j++){
            let cellAdress = i + '_' + j
            if(cellAdress === cell[0]) continue
            if(board[cellAdress] === cell[1]) return false
        }
    }
    return true
}
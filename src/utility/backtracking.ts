import { cellInterface } from "./makeCells";


export default function(orgBoard: cellInterface) {

    if(!checkStartCondition(orgBoard)) {
        console.log('invalid board')
        return orgBoard
    }
    try {
        return solveSudoku(1, 1, {...orgBoard}, orgBoard )
    } catch (error) {
        console.log('Possible invalid board')
        return orgBoard
    }

}

function solveSudoku(row: number, col: number, board: cellInterface, orgBoard:cellInterface): cellInterface {
    
    if(row === 10) return board
    if(row === 0) return orgBoard

    let cellAdress = row + '_' + col

    if(orgBoard[cellAdress] !== '') {
        row = col < 9 ? row : row + 1
        col = col < 9 ? col + 1 : 1
        return solveSudoku(row, col, board, orgBoard)
    }

    let success = setCellValue(cellAdress, board[cellAdress] ,board)

    if(success) {
        row = col < 9 ? row : row + 1
        col = col < 9 ? col + 1 : 1
        return solveSudoku(row, col, board, orgBoard)
    } else {
        board[cellAdress] = ''
        do {
            row = col > 1 ? row : row - 1
            col = col > 1 ? col - 1 : 9
            if(row <= 0) return orgBoard
        } while(orgBoard[row + '_' + col])

        return solveSudoku(row, col, board, orgBoard)
    }

}


function validate(cellAdress: string, val: string, board:cellInterface) {
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

function setCellValue(cellAdress: string, cellValue: string, board:cellInterface) {
    for(let i = +cellValue + 1 || 1; i <= 9; i++){
        if(validate(cellAdress, String(i), board))  {
            board[cellAdress] = String(i)
            return true
        }
    }
    return false
}

function checkStartCondition(board:cellInterface) {
    for(let [cellAdress, cellValue] of Object.entries(board)){
        if(!cellValue) continue
        if(!validate(cellAdress, cellValue, board)) return false
    }
    return true

}
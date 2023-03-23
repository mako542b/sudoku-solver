import { cellInterface } from "./makeCells";


export default async function startSolveBySteps(board: cellInterface, setter: React.Dispatch<React.SetStateAction<cellInterface>>){
    try {
        return await solveBySteps(1, 1, {...board}, board, setter)
    } catch {
        return false
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(() => resolve(null), ms))
}

async function solveBySteps(row: number, col: number, board: cellInterface, orgBoard:cellInterface,setter: React.Dispatch<React.SetStateAction<cellInterface>> ): Promise<boolean> {
    
    if(row === 10) return true
    if(row === 0) return false

    let cellAdress = row + '_' + col

    if(orgBoard[cellAdress] !== '') {
        row = col < 9 ? row : row + 1
        col = col < 9 ? col + 1 : 1
        return solveBySteps(row, col, board, orgBoard, setter)
    }

    let success = await setCellValue(cellAdress, board[cellAdress] ,board, setter)

    if(success) {
        setter({...board})

        // await delay(150)

        row = col < 9 ? row : row + 1
        col = col < 9 ? col + 1 : 1
        return solveBySteps(row, col, board, orgBoard, setter)
    } else {
        board[cellAdress] = ''
        setter({...board})
        do {
            row = col > 1 ? row : row - 1
            col = col > 1 ? col - 1 : 9
            if(row <= 0) return false
        } while(orgBoard[row + '_' + col])

        return solveBySteps(row, col, board, orgBoard, setter)
    }

}

async function setCellValue(cellAdress: string, cellValue: string, board:cellInterface, setter: React.Dispatch<React.SetStateAction<cellInterface>>) {
    for(let i = +cellValue + 1 || 1; i <= 9; i++){
        setter(prev => ({...prev, [cellAdress]: String(i)}))
        await delay(4)
        if(validate(cellAdress, String(i), board))  {
            board[cellAdress] = String(i)
            return true
        }
    }
    return false
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
import { cellInterface } from "./makeCells";

type stateSetter<n> = React.Dispatch<React.SetStateAction<n>>


export default async function startSolveBySteps(
    board: cellInterface, 
    originalBoard: cellInterface,
    boardSetter: stateSetter<cellInterface>, 
    calculatingCellSetter: stateSetter<string>,
    setcollidingCells: stateSetter<string[]>,
    setValidated: stateSetter<boolean>,
    aborted: React.MutableRefObject<boolean>,
    delayDuration: React.MutableRefObject<number>,
    calculatingCell: string,
){
    try {
        let [row, col] = calculatingCell.split('_').map(a => +a)
        return await solveBySteps(row, col, {...board}, originalBoard)
    } catch {
        return false
    }


    // 

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(() => resolve(null), 801 - delayDuration?.current || 100))
    }

    async function solveBySteps(
        row: number, 
        col: number, 
        board: cellInterface, 
        orgBoard:cellInterface, 
    ): Promise<boolean> {

        
        if(row === 10) return true
        if(row === 0) return true
        
        let cellAdress = row + '_' + col
        calculatingCellSetter(cellAdress)
        if(aborted.current) return false

        if(orgBoard[cellAdress] !== '') {
            row = col < 9 ? row : row + 1
            col = col < 9 ? col + 1 : 1
            return solveBySteps(row, col, board, orgBoard)
        }

        let success = await setCellValue(cellAdress, board[cellAdress] ,board)

        if(success === 'break') return false

        if(success) {
            boardSetter({...board})

            row = col < 9 ? row : row + 1
            col = col < 9 ? col + 1 : 1
            return solveBySteps(row, col, board, orgBoard)
        } else {
            board[cellAdress] = ''
            boardSetter({...board})
            do {
                row = col > 1 ? row : row - 1
                col = col > 1 ? col - 1 : 9
                calculatingCellSetter(row + '_' + col)
                if(row <= 0) return true
            } while(orgBoard[row + '_' + col])

            return solveBySteps(row, col, board, orgBoard)
        }

    }

    async function setCellValue(cellAdress: string, cellValue: string, board:cellInterface) {
        for(let i = +cellValue + 1 || 1; i <= 9; i++){
            if(aborted.current) return 'break'
            boardSetter(prev => ({...prev, [cellAdress]: String(i)}))
            setcollidingCells([])
            await delay(500)
            if(validate(cellAdress, String(i), board))  {            
                board[cellAdress] = String(i)
                setValidated(true)
                await delay(500)
                setValidated(false)
                return true
            }
            await delay(500)
        }
        return false
    }

    function validate(cellAdress: string, val: string, board:cellInterface) {
        let [row, col] = cellAdress.split('_')
        let valid = true
        let collading : string[] = []

        for(let i = 1; i <= 9; i++){

            let rowAdjCell = row + '_' + i
            if(board[rowAdjCell] === val && cellAdress !== rowAdjCell){
                collading.push(rowAdjCell)
                valid = false
            }
            let colAdjCell = i + '_' + col
            if(board[colAdjCell] === val && cellAdress !== colAdjCell){
                collading.push(colAdjCell)
                valid = false
            }
        }

        let rowStart = (Math.floor((+row - 1) / 3) * 3) + 1
        let colStart = (Math.floor((+col - 1) / 3) * 3) + 1
        for(let i = rowStart; i < rowStart + 3; i++){
            for(let j = colStart; j < colStart + 3; j++){
                let groupCellAdress = i + '_' + j
                if(cellAdress === groupCellAdress) continue
                if(board[groupCellAdress] === val){
                    collading.push(groupCellAdress)
                    valid = false
                }
            }
        }
        setcollidingCells(collading)
        return valid
    }

}


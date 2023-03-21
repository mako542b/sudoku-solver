export interface cellInterface {
    [key: string] : string;
}

const cells: cellInterface = {}
for(let i = 1; i <= 9; i++){
    for(let j = 1; j <= 9; j++){
        let newCell = i + '_' + j
        cells[newCell] = ''
    }
}

export default cells
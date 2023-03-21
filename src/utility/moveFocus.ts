export default function(prev: string | null, key: string | null) {
    if (!prev || !key) return ''

    if(key === 'ArrowUp'){
        let row = +prev[0] >= 2 ? +prev[0] - 1 : 9
        return row + '_' + prev[2]
    }

    if(key === 'ArrowDown'){
        let row = +prev[0] <= 8 ? +prev[0] + 1 : 1
        return row + '_' + prev[2]
    }

    if(key === 'ArrowLeft'){
        let col = +prev[2] >= 2 ? +prev[2] - 1 : 9
        return prev[0] + '_' + col
    }

    if(key === 'ArrowRight'){
        let col = +prev[2] <= 8 ? +prev[2] + 1 : 1
        return prev[0] + '_' + col
    }

    if(key === 'next'){
        let col = +prev[2]
        let row = +prev[0]
        if(col === 9) row = row < 9 ? row + 1 : 1
        col = col < 9 ? col + 1 : 1
        return row + '_' + col
    }
    
    else return prev

}
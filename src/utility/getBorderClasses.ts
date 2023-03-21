

export default function(cell: string) {
    const [row, col] = cell.split('_')
    let classes = ''
    if(['3', '6', '9'].includes(row)) classes += 'border-b-[2px] ' 
    else classes += 'border-b-[1px] '

    if(['1', '4', '7'].includes(row)) classes += 'border-t-[2px] '
    else classes += 'border-t-[1px] '

    if(['3', '6', '9'].includes(col)) classes += 'border-r-[2px] '
    else classes += 'border-r-[1px] '

    if(['1', '4', '7'].includes(col)) classes += 'border-l-[2px] '
    else classes += 'border-l-[1px] '

    return classes
}
function Square({ row, col, isHighlighted, onClick, children }) {

    const isLight = (row + col) % 2 == 0;
    const className = `square ${isLight ? 'light' : 'dark'} ${isHighlighted ? 'highlighted' : ''}`;

    return (
        <div className={className} onClick={() => onClick(row, col)}>
            {children}
        </div>
    )

}

export default Square;
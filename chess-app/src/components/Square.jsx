export default function Square({ row, col, isHighlighted, onClick, children }) {
    const isDark = (row + col) % 2 === 1;

    return (
        <div
            className={`square w-[40px] h-[40px
                ] flex items-center justify-center 
        ${isDark ? 'bg-green-700' : 'bg-green-200'} 
        ${isHighlighted ? 'ring-4 ring-yellow-400' : ''}`}
            onClick={() => onClick(row, col)}
        >
            {children}
        </div>
    );
}

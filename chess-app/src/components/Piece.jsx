import pieceMap from '../assets/pieceMap'

export default function Piece({ type, position }) {
    const src = pieceMap[type];

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(position));
    };

    return (
        <img
            src={src}
            alt={type}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8"
            draggable
            onDragStart={handleDragStart}
        />
    );
}

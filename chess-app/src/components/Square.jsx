import { useDroppable } from '@dnd-kit/core';

export default function Square({ id, x, y, children }) {
    const { setNodeRef, isOver } = useDroppable({
        id,
    });

    const isDark = (x + y) % 2 === 1;

    return (
        <div
            ref={setNodeRef}
            className={`w-[60px] h-[60px] border border-black flex items-center justify-center 
        ${isDark ? 'bg-[#769656]' : 'bg-[#eeeed2]'} 
        ${isOver ? 'ring-4 ring-blue-400' : ''}`}
        >
            {children}
        </div>
    );
}

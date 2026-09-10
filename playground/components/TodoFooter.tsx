"use client";

type Props = {
    activeCount: number;
    completedCount: number;
    onSetAllDone: (done: boolean) => void;
    onClearCompleted: () => void;
};

export default function TodoFooter({
    activeCount,
    completedCount,
    onSetAllDone,
    onClearCompleted,
}: Props) {
    const allDone = activeCount === 0;

    return (
        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-zinc-500">
            <span>
                {activeCount} {activeCount === 1 ? "item" : "items"} left
            </span>
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => onSetAllDone(!allDone)}
                    className="cursor-pointer hover:text-black"
                >
                    {allDone ? "Unmark all" : "Mark all done"}
                </button>
                {completedCount > 0 && (
                    <button
                        type="button"
                        onClick={onClearCompleted}
                        className="cursor-pointer hover:text-black"
                    >
                        Clear completed
                    </button>
                )}
            </div>
        </div>
    );
}

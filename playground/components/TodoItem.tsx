"use client";

import type { Todo } from "@/lib/todos";
import { Pencil, X } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
    todo: Todo;
    onToggle: (id: string) => void;
    onEdit: (id: string, text: string) => void;
    onDelete: (id: string) => void;
};

const iconButtonClass =
    "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100";

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(todo.text);
    const cancelled = useRef(false);

    function startEditing() {
        setDraft(todo.text);
        setEditing(true);
    }

    // Enter and Escape both blur the input, so saving happens in one place.
    function finishEditing() {
        if (!cancelled.current) {
            const text = draft.trim();
            if (text) onEdit(todo.id, text);
            else onDelete(todo.id);
        }
        cancelled.current = false;
        setEditing(false);
    }

    return (
        <li className="group flex items-center gap-3 py-3">
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
                aria-label={`Mark "${todo.text}" as ${todo.done ? "not done" : "done"}`}
                className="h-4 w-4 cursor-pointer accent-black"
            />

            {editing ? (
                <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={finishEditing}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.currentTarget.blur();
                        } else if (e.key === "Escape") {
                            cancelled.current = true;
                            e.currentTarget.blur();
                        }
                    }}
                    autoFocus
                    aria-label="Edit todo"
                    className="min-w-0 flex-1 border-b border-zinc-300 text-black outline-none focus:border-zinc-500"
                />
            ) : (
                <span
                    onClick={startEditing}
                    className={`min-w-0 flex-1 cursor-text border-b border-transparent break-words ${
                        todo.done ? "text-zinc-400 line-through" : "text-black"
                    }`}
                >
                    {todo.text}
                </span>
            )}

            {/* Hidden rather than removed while editing so the row doesn't reflow. */}
            <div
                className={`-my-1 -mr-2 flex opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100 ${
                    editing ? "invisible" : ""
                }`}
            >
                <button
                    type="button"
                    onClick={startEditing}
                    aria-label={`Edit "${todo.text}"`}
                    className={`${iconButtonClass} hover:text-black`}
                >
                    <Pencil size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => onDelete(todo.id)}
                    aria-label={`Delete "${todo.text}"`}
                    className={`${iconButtonClass} hover:text-red-500`}
                >
                    <X size={16} />
                </button>
            </div>
        </li>
    );
}

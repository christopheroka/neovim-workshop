"use client";

import { useState } from "react";

type Props = {
    onAdd: (text: string) => void;
};

export default function TodoForm({ onAdd }: Props) {
    const [input, setInput] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const text = input.trim();
        if (!text) return;
        onAdd(text);
        setInput("");
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What needs to be done?"
                aria-label="New todo"
                className="flex-1 rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-black outline-none focus:border-zinc-500"
            />
            <button
                type="submit"
                className="cursor-pointer rounded-lg bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-zinc-800"
            >
                Add
            </button>
        </form>
    );
}

"use server";

import { revalidatePath } from "next/cache";
import { readTodos, writeTodos } from "./db";
import type { Todo } from "./todos";

async function update(change: (todos: Todo[]) => Todo[]) {
    await writeTodos(change(await readTodos()));
    revalidatePath("/");
}

export async function addTodo(id: string, text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    await update((todos) => [...todos, { id, text: trimmed, done: false }]);
}

export async function toggleTodo(id: string) {
    await update((todos) =>
        todos.map((todo) =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        )
    );
}

export async function editTodo(id: string, text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    await update((todos) =>
        todos.map((todo) =>
            todo.id === id ? { ...todo, text: trimmed } : todo
        )
    );
}

export async function deleteTodo(id: string) {
    await update((todos) => todos.filter((todo) => todo.id !== id));
}

export async function setAllDone(done: boolean) {
    await update((todos) => todos.map((todo) => ({ ...todo, done })));
}

export async function clearCompleted() {
    await update((todos) => todos.filter((todo) => !todo.done));
}

"use client";

import { useState } from "react";
import { useTodos, type Filter, type Todo } from "@/lib/todos";
import TodoFilters from "./TodoFilters";
import TodoFooter from "./TodoFooter";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

function matchesFilter(todo: Todo, filter: Filter) {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
}

type Props = {
    savedTodos: Todo[];
};

export default function TodoApp({ savedTodos }: Props) {
    const { todos, add, toggle, edit, remove, setAllDone, clearCompleted } =
        useTodos(savedTodos);
    const [filter, setFilter] = useState<Filter>("all");

    const activeCount = todos.filter((todo) => !todo.done).length;
    const completedCount = todos.length - activeCount;
    const visibleTodos = todos.filter((todo) => matchesFilter(todo, filter));

    return (
        <main className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-black">
                Todos
            </h1>

            <TodoForm onAdd={add} />

            <TodoFilters
                filter={filter}
                counts={{
                    all: todos.length,
                    active: activeCount,
                    completed: completedCount,
                }}
                onChange={setFilter}
            />

            <ul className="divide-y divide-zinc-200">
                {visibleTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggle}
                        onEdit={edit}
                        onDelete={remove}
                    />
                ))}
                {visibleTodos.length === 0 && (
                    <li className="py-6 text-center text-zinc-400">
                        {todos.length === 0 ? "No todos yet." : "Nothing here."}
                    </li>
                )}
            </ul>

            {todos.length > 0 && (
                <TodoFooter
                    activeCount={activeCount}
                    completedCount={completedCount}
                    onSetAllDone={setAllDone}
                    onClearCompleted={clearCompleted}
                />
            )}
        </main>
    );
}

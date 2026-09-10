import { startTransition, useOptimistic } from "react";
import * as actions from "./actions";

export type Todo = {
    id: string;
    text: string;
    done: boolean;
};

export type Filter = "all" | "active" | "completed";

export const FILTERS: Filter[] = ["all", "active", "completed"];

type Change =
    | { type: "add"; id: string; text: string }
    | { type: "toggle"; id: string }
    | { type: "edit"; id: string; text: string }
    | { type: "remove"; id: string }
    | { type: "setAllDone"; done: boolean }
    | { type: "clearCompleted" };

function applyChange(todos: Todo[], change: Change): Todo[] {
    switch (change.type) {
        case "add":
            return [...todos, { id: change.id, text: change.text, done: false }];
        case "toggle":
            return todos.map((todo) =>
                todo.id === change.id ? { ...todo, done: !todo.done } : todo
            );
        case "edit":
            return todos.map((todo) =>
                todo.id === change.id ? { ...todo, text: change.text } : todo
            );
        case "remove":
            return todos.filter((todo) => todo.id !== change.id);
        case "setAllDone":
            return todos.map((todo) => ({ ...todo, done: change.done }));
        case "clearCompleted":
            return todos.filter((todo) => !todo.done);
    }
}

function createId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// `todos` comes from the server. Each change shows up immediately via
// useOptimistic, then a Server Action saves it to db.json and the page
// re-renders with the saved data.
export function useTodos(todos: Todo[]) {
    const [optimisticTodos, addOptimistic] = useOptimistic(todos, applyChange);

    function run(change: Change, save: () => Promise<void>) {
        startTransition(async () => {
            addOptimistic(change);
            await save();
        });
    }

    return {
        todos: optimisticTodos,
        add(text: string) {
            const id = createId();
            run({ type: "add", id, text }, () => actions.addTodo(id, text));
        },
        toggle(id: string) {
            run({ type: "toggle", id }, () => actions.toggleTodo(id));
        },
        edit(id: string, text: string) {
            run({ type: "edit", id, text }, () => actions.editTodo(id, text));
        },
        remove(id: string) {
            run({ type: "remove", id }, () => actions.deleteTodo(id));
        },
        setAllDone(done: boolean) {
            run({ type: "setAllDone", done }, () => actions.setAllDone(done));
        },
        clearCompleted() {
            run({ type: "clearCompleted" }, () => actions.clearCompleted());
        },
    };
}

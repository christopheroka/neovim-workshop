import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Todo } from "./todos";

// Stand-in for a real database: todos live in db.json.
const DB_PATH = path.join(process.cwd(), "db.json");

export async function readTodos(): Promise<Todo[]> {
    return JSON.parse(await readFile(DB_PATH, "utf8"));
}

export async function writeTodos(todos: Todo[]) {
    await writeFile(DB_PATH, JSON.stringify(todos, null, 4) + "\n");
}

export async function getTodos(): Promise<Todo[]> {
    return readTodos();
}

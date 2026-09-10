import TodoApp from "@/components/TodoApp";
import { getTodos } from "@/lib/db";

export default async function Home() {
    const todos = await getTodos();

    return (
        <div className="flex flex-1 flex-col items-center bg-zinc-50 px-4 py-16 font-sans">
            <TodoApp savedTodos={todos} />
        </div>
    );
}

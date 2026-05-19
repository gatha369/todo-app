"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col items-center pt-20 px-4">
      <h1 className="text-5xl font-thin tracking-widest text-blue-900 mb-10">
        TODO
      </h1>

      {/* Input */}
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md flex items-center px-4 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="タスクを入力してください..."
          className="flex-1 py-4 text-gray-700 placeholder-gray-400 outline-none text-lg"
        />
        <button
          onClick={addTodo}
          className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors"
        >
          追加
        </button>
      </div>

      {/* Todo list */}
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-10 text-sm">
            {filter === "completed"
              ? "完了済みタスクはありません"
              : filter === "active"
              ? "未完了タスクはありません"
              : "タスクがありません"}
          </p>
        ) : (
          <ul>
            {filtered.map((todo, i) => (
              <li
                key={todo.id}
                className={`flex items-center px-4 py-4 group ${
                  i !== filtered.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 transition-colors ${
                    todo.completed
                      ? "bg-green-400 border-green-400"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                  aria-label={todo.completed ? "未完了にする" : "完了にする"}
                >
                  {todo.completed && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>

                <span
                  className={`flex-1 text-base ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="ml-2 text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="削除"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 text-sm text-gray-500 border-t border-gray-100">
            <span>{activeCount} 件残っています</span>

            <div className="flex gap-1">
              {(["all", "active", "completed"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded transition-colors ${
                    filter === f
                      ? "border border-blue-400 text-blue-500"
                      : "hover:border hover:border-gray-300"
                  }`}
                >
                  {f === "all" ? "すべて" : f === "active" ? "未完了" : "完了"}
                </button>
              ))}
            </div>

            <button
              onClick={clearCompleted}
              className="hover:text-gray-700 transition-colors"
            >
              完了済みを削除
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

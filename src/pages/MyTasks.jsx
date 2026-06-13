import { useEffect, useState } from "react";
import { getTasks } from "../services/taskApi";

function MyTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-6">

            {/* HEADER */}
            <div className="mb-6 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    📝 My Tasks
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Manage your personal tasks efficiently
                </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

                {tasks.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">
                        No tasks found 🚀
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task._id}
                            className="group bg-white/80 backdrop-blur-md border border-white/40 
                            shadow-lg rounded-2xl p-4 sm:p-5 transition-all duration-300
                            hover:shadow-2xl hover:-translate-y-1"
                        >

                            {/* TITLE */}
                            <h2 className="font-semibold text-gray-800 text-lg group-hover:text-indigo-600 transition">
                                {task.title}
                            </h2>

                            {/* STATUS + PRIORITY */}
                            <div className="flex flex-wrap gap-2 mt-3">

                                {/* STATUS */}
                                <span className={`text-xs px-3 py-1 rounded-full font-medium
                                    ${task.status === "done"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                    {task.status}
                                </span>

                                {/* PRIORITY */}
                                <span className={`text-xs px-3 py-1 rounded-full font-medium
                                    ${task.priority === "high"
                                        ? "bg-red-100 text-red-600"
                                        : task.priority === "medium"
                                            ? "bg-blue-100 text-blue-600"
                                            : "bg-gray-200 text-gray-700"
                                    }`}>
                                    {task.priority}
                                </span>

                            </div>

                            {/* DATE */}
                            {task.due && (
                                <p className="text-xs text-gray-500 mt-3">
                                    📅 Due: {task.due}
                                </p>
                            )}

                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyTasks;
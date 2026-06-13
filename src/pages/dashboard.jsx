import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, deleteTask, updateTask } from "../services/taskApi.js";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data || []);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const matchSearch = task.title?.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "all" ? true : task.status === filter;
        return matchSearch && matchFilter;
    });

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((t) => t._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (task) => setEditTask(task);

    const handleUpdate = async () => {
        try {
            const updated = await updateTask(editTask._id, editTask);
            setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
            setEditTask(null);
        } catch (err) {
            console.error(err);
        }
    };

    //   peroirity function

    const handlePriorityChange = async (task, newPriority) => {
        const updated = await updateTask(task._id, {
            ...task,
            priority: newPriority,
        });

        setTasks((prev) =>
            prev.map((t) => (t._id === updated._id ? updated : t))
        );
    };
    //  status 
    const handleStatusChange = async (task, newStatus) => {
        const updated = await updateTask(task._id, {
            ...task,
            status: newStatus,
        });

        setTasks((prev) =>
            prev.map((t) => (t._id === updated._id ? updated : t))
        );
    };

    // logout function

 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};

    return (
        <div className="h-screen flex bg-gray-50 overflow-hidden">
            {/* MOBILE MENU BUTTON */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden fixed top-2 right-4 z-50 bg-indigo-600 text-white px-3 py-2 rounded"
            >
                ☰
            </button>

            {/* OVERLAY */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed md:static top-0 left-0 h-full w-64 bg-[#0f172a] text-white z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 flex flex-col`}>
                <button onClick={() => setSidebarOpen(false)} className="md:hidden p-3 text-left">
                    ✖
                </button>

                <div className="p-5 border-b border-gray-700">
                    <h1 className="text-xl font-bold text-indigo-400">Flow Task</h1>
                </div>

                <div className="p-4 space-y-3 text-sm">
                    <button className="w-full text-left p-2 rounded hover:bg-gray-800">📊 Dashboard</button>
                    <button 
                    onClick={() => navigate("/tasks")} 
                    className="w-full text-left p-2 rounded hover:bg-gray-800">📝 My Tasks</button>
                    <button
                        onClick={() => navigate("/settings")}
                        className="w-full text-left p-2 rounded hover:bg-gray-800">⚙ Settings</button>
                    <button
                        onClick={() => navigate("/add-task")}
                        className="relative px-5 py-2.5 rounded-xl font-semibold text-white bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
                    >
                        <span className="relative z-10">+ Add Task</span>
                        <span className="absolute inset-0 bg-white/10 blur-xl opacity-30"></span>
                    </button>
                </div>

                <div className="mt-auto p-4 border-t border-gray-700">
                    <button className="w-full bg-indigo-600 py-2 rounded hover:bg-indigo-700" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </aside>

            {/* MAIN */}
            <main className="flex-1 flex flex-col w-full">
                {/* TOP BAR */}
                <div className="bg-white shadow px-4 py-4 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
                    <h2 className="font-semibold text-gray-800 text-lg">Dashboard</h2>
                    <div className="flex items-center gap-3">

                        {/* USER BUTTON (LEFT) */}
                        <button className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition">
                            👤 {user?.name || "Guest"}
                        </button>


                        <div className="flex flex-col justify-between sm:flex-row gap-2 w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="w-full sm:w-64 border p-2 rounded-lg text-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <select className="border p-2 rounded-lg text-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="done">Completed</option>
                        </select>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="p-4 overflow-auto">
                    {/* STATS */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                        <div className="bg-white p-4 rounded-xl shadow border">
                            <p className="text-gray-500 text-sm">Total Tasks</p>
                            <h3 className="text-xl font-bold text-indigo-600">{tasks.length}</h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow border">
                            <p className="text-gray-500 text-sm">Completed</p>
                            <h3 className="text-xl font-bold text-green-600">{tasks.filter((t) => t.status === "done").length}</h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow border">
                            <p className="text-gray-500 text-sm">Pending</p>
                            <h3 className="text-xl font-bold text-red-500">{tasks.filter((t) => t.status === "pending").length}</h3>
                        </div>
                    </div>

                    {/* TASKS */}
                    <h3 className="text-2xl font-bold mb-4">Do All Tasks</h3>
                    <div className="space-y-3">
                        {filteredTasks.map((task) => (
                            <div
                                key={task._id}
                                className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border rounded-lg hover:shadow-md transition"
                            >
                                {/* LEFT */}
                                <div>
                                    <h3 className="font-medium text-gray-800">{task.title}</h3>
                                    <p className="text-xs text-gray-500">Due: {task.due}</p>
                                </div>

                                {/* RIGHT */}
                                <div className="flex flex-wrap items-center gap-2">

                                    {/* STATUS BADGE */}
                                    <span className={`text-xs px-3 py-1 rounded-full ${task.status === "done"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-200 text-gray-700"
                                        }`}>
                                        {task.status}
                                    </span>

                                    {/* PRIORITY BADGE */}
                                    <span className={`text-xs px-3 py-1 rounded-full ${task.priority === "high"
                                        ? "bg-red-100 text-red-600"
                                        : task.priority === "medium"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : "bg-green-100 text-green-600"
                                        }`}>
                                        {task.priority}
                                    </span>

                                    {/* ACTIONS */}
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:scale-105 transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="text-xs px-3 py-1 bg-red-500 text-white rounded hover:scale-105 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* EDIT MODAL */}
                    {editTask && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                            <div className="bg-white p-5 rounded-lg w-96 space-y-4">

                                <h2 className="text-lg font-semibold">Edit Task</h2>

                                <input
                                    value={editTask.title}
                                    onChange={(e) =>
                                        setEditTask({ ...editTask, title: e.target.value })
                                    }
                                    className="border p-2 w-full rounded"
                                />

                                <select
                                    value={editTask.status}
                                    onChange={(e) =>
                                        setEditTask({ ...editTask, status: e.target.value })
                                    }
                                    className="border p-2 w-full rounded"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="done">Done</option>
                                </select>

                                <select
                                    value={editTask.priority}
                                    onChange={(e) =>
                                        setEditTask({ ...editTask, priority: e.target.value })
                                    }
                                    className="border p-2 w-full rounded"
                                >
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>

                                <div className="flex gap-2">
                                    <button
                                        onClick={handleUpdate}
                                        className="flex-1 bg-green-600 text-white py-2 rounded"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => setEditTask(null)}
                                        className="flex-1 bg-gray-400 text-white py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;

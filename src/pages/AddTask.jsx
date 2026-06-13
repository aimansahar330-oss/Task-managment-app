import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/taskApi";

const AddTask = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    status: "pending",
    priority: "medium",
    due: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ FIXED
    setError("");

    try {
      const newTask = {
        ...form,
      };

      await createTask(newTask);
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">

      {/* CARD */}
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl shadow-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-indigo-200">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            ✨ Add New Task
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Stay organized & boost productivity
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <div>
            <label className="text-sm text-gray-600">Task Title</label>
            <input
              name="title"
              placeholder="Enter task..."
              value={form.title}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
              required
            />
          </div>

          {/* PRIORITY + STATUS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            <div>
              <label className="text-sm text-gray-600">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full mt-1 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400"
              >
                <option value="high"> High</option>
                <option value="medium"> Medium</option>
                <option value="low"> Low</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full mt-1 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400"
              >
                <option value="pending"> Pending</option>
                <option value="done">Completed</option>
              </select>
            </div>

          </div>

          {/* DATE */}
          <div>
            <label className="text-sm text-gray-600">Due Date</label>
            <input
              type="date"
              name="due"
              value={form.due}
              onChange={handleChange}
              className="w-full mt-1 border p-3 rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl font-semibold text-white
              bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500
              shadow-lg hover:shadow-2xl transition-all duration-300
              hover:scale-[1.02] active:scale-95"
            >
              {loading ? "Adding..." : "🚀 Add Task"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 py-3 rounded-xl font-semibold border border-gray-300
              hover:bg-gray-100 transition"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTask;
import { useState } from "react";
import axios from "axios";

function Settings() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const handleUpdate = async () => {
        try {
            setLoading(true);

            const res = await axios.put(
                "http://localhost:5000/api/user/profile",
                { name, email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            localStorage.setItem("user", JSON.stringify(res.data.user));
            alert("Profile updated successfully");

        } catch (error) {
            console.log(error);
            alert("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center p-4">

            <div className="w-full max-w-2xl">

                {/* HEADER */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Settings ⚙</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage your profile information
                    </p>
                </div>

                {/* CARD */}
                <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-100">

                    <div className="grid gap-5">

                        {/* NAME */}
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="w-full mt-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                        >
                            {loading ? "Updating..." : "Update Profile"}
                        </button>

                    </div>
                </div>

                {/* FOOTER NOTE */}
                <p className="text-center text-xs text-gray-400 mt-5">
                    Your information is securely stored 🔒
                </p>

            </div>
        </div>
    );
}

export default Settings;
import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/forgot-password",
                { email }
            );

            setMessage("Reset link sent successfully!");
            window.location.href = res.data.resetLink;
            console.log("RESET LINK:", res.data.resetLink);

        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">

            <div className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-white/40 shadow-2xl rounded-2xl p-6 sm:p-8">

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    🔐 Forgot Password
                </h2>

                {/* EMAIL INPUT */}
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                {/* BUTTON */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl font-semibold transition"
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

                {/* SUCCESS MESSAGE */}
                {message && (
                    <p className="text-green-600 text-sm mt-4 text-center">
                        {message}
                    </p>
                )}

                {/* ERROR MESSAGE */}
                {error && (
                    <p className="text-red-500 text-sm mt-4 text-center">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
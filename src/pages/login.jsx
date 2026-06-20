import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../utils/validation";
import { loginUser } from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await loginUser({
                email,
                password
            });

            console.log("login response:", res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");

            setTimeout(() => {
                setLoading(false);
                setShowPopup(true);
            }, 2000);

        } catch (error) {
            setLoading(false);
            alert(error.response?.data?.message || "Invalid email or password");
        }
    };

    return (
        <div className="h-screen  flex flex-col lg:flex-row bg-gray-50">

            {/* BLUE SECTION - FIXED FOR ALL SCREENS */}
            <div className="w-full lg:w-1/2 relative overflow-hidden bg-[#0f172a] min-h-[40vh] lg:min-h-screen">

                {/* glow */}
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-600 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

                {/* ✅ CENTER FIX + RESPONSIVE SAFE */}
                <div className="relative z-10 flex flex-col justify-center items-center text-center text-white
    h-full px-6 py-10 sm:py-14 lg:p-0">

                    <div className="absolute top-4 md:top-12 left-4 md:left-8 flex items-center">
                        <h1 className="font-extrabold relative">

                            {/* glow layer */}
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-50"></span>

                            {/* main text - FIXED ANIMATION FOR ALL SCREENS */}
                            <span
                                className="block text-3xl sm:text-4xl md:text-5xl lg:text-4xl 
    bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
    bg-clip-text text-transparent 
    animate-pulse"
                                style={{ 
                                    fontFamily: "Poppins, sans-serif",
                                    animationDuration: "2s",
                                    animationIterationCount: "infinite"
                                }}
                            >
                                Flow Task
                            </span>

                        </h1>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                        Flow Task System
                    </h1>

                    <p className="mt-3 text-gray-300 text-sm sm:text-base max-w-xs sm:max-w-sm">
                        Manage your tasks efficiently with a modern workflow system built for productivity.
                    </p>

                    <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400">
                        Secure • Fast • Reliable
                    </div>
                </div>
            </div>

            {/* 🔥 FORM SECTION */}
            <div className="flex w-full lg:w-1/2 items-center justify-center px-4 py-8 sm:px-6 lg:px-10">

                <div className="w-full max-w-md">

                    {/* CARD */}
                    <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-100">

                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
                            Login
                        </h2>

                        <p className="text-center text-gray-500 mt-2 text-xs sm:text-sm">
                            Welcome back! Please enter your details
                        </p>

                        <form onSubmit={handleLogin} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">

                            {/* EMAIL */}
                            <div>
                                <label className="text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full mt-2 p-2.5 sm:p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <label className="text-sm text-gray-600">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full mt-2 p-2.5 sm:p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            {/* OPTIONS */}
                            <div className="flex justify-between items-center text-xs sm:text-sm">
                                <label className="flex items-center gap-2 text-gray-600">
                                    <input type="checkbox" />
                                    Remember me
                                </label>

                                <p
                                    onClick={() => navigate("/forgot-password")}
                                    className="text-indigo-600 hover:underline cursor-pointer"
                                >
                                    Forgot password?
                                </p>
                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl"
                            >
                                {loading ? (
                                    <div className="w-full h-12 bg-indigo-500/40 rounded-xl animate-pulse"></div>
                                ) : (
                                    <div className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
                                        Login
                                    </div>
                                )}
                            </button>
                            {/* REGISTER LINK */}
                            <p className="text-center text-sm text-gray-500 mt-4 sm:mt-6">
                                Don't have an account?{" "}
                                <span
                                    onClick={() => navigate("/register")}
                                    className="text-indigo-600 cursor-pointer hover:underline"
                                >
                                    Register
                                </span>
                            </p>
                        </form>
                    </div>

                    {/* footer */}
                    <p className="text-center text-xs text-gray-400 mt-5 sm:mt-6">
                        © 2026 Flow Task System
                    </p>

                    {showPopup && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                            <div className="bg-white p-6 rounded-xl text-center w-[320px] shadow-xl">

                                <div className="text-green-500 text-4xl mb-2">✓</div>

                                <h2 className="text-lg font-bold">Login Successful</h2>

                                <p className="text-gray-500 mt-2 text-sm">
                                    Welcome back to Flow Task System
                                </p>

                                <button
                                    type="submit"
                                    onClick={() => {
                                        setShowPopup(false);
                                        navigate("/dashboard");
                                    }}
                                    className="mt-4 w-full bg-indigo-600 hover:bg-indigo-400 text-white py-2 rounded-lg font-semibold"
                                >
                                    Go to Dashboard
                                </button>

                            </div>

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Login;
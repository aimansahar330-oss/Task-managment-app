// REGISTER VALIDATION (BACKEND)
export const validateRegister = (name, email, password, confirmPassword) => {
    if (!name || !email || !password || !confirmPassword) {
        return "All fields are required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Invalid email format";
    }

    if (password.length < 6) {
        return "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
        return "Passwords do not match";
    }

    return null;
};


// LOGIN VALIDATION (BACKEND)
export const validateLogin = (email, password) => {
    if (!email || !password) {
        return "Email and password required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Invalid email format";
    }

    if (password.length < 6) {
        return "Password must be at least 6 characters";
    }

    return null;
};
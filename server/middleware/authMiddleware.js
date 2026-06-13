import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    let token = req.headers.authorization;

    console.log("AUTH HEADER:", token); // 🔥 DEBUG

    if (token && token.startsWith("Bearer")) {
        try {
            token = token.split(" ")[1]; // ✔ FIXED

            const decoded = jwt.verify(token, "secretkey"); // ✔ SAME SECRET

            req.user = decoded.id;
            next();

        } catch (error) {
            console.log("JWT ERROR:", error.message);
            return res.status(401).json({ message: "not authorized" });
        }
    } else {
        return res.status(401).json({ message: "no token" });
    }
};
import User from "../models/user.js";

// update profile 

export const updateProfile = async(req,res) => {
    try {
        const user = await User.findById(req.user);

        if(!user) {
            return res.status(404).json({message: "user not found"})
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        const updatedUser = await user.save();

        res.json({
            message: "profile updated",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            },
        })
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}
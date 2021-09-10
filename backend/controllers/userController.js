import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// Express async handler: Simple middleware for handling 
//      exceptions inside of async express routes and passing 
//      them to your express error handlers.

// @desc     Auth user & get token
//           Authenticated the user, validate email & password, 
//           then send back some data/token.
//           Token will be saved on the client 
//           and can be used to access protected routes later. 
// 
// @routes   POST /api/users/login
// @access   Public Route
const authUser = asyncHandler(async (req, res) => {
    // get data from body
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    // check if user exist, and password matches
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
})

// @desc     Get user profile 
// @routes   GET /api/users/profile
// @access   Private Route
const getUserProfile = asyncHandler(async (req, res) => {

    // find user
    const user = await User.findById( req.user._id );

    if (user) {
        // return data for the logged in user
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }

    // res.send("success");
})

export { authUser, getUserProfile }
import bcrypt from 'bcryptjs';

import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/generateToken.js';


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Retrieve user from the database
        const user = await User.findOne({ username });
        
        // Check if user exists
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        
        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Generate token and set cookie
        generateTokenAndSetCookie(user._id, res);

        // Respond with user details
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async (req , res)=>{
    try {
       res.cookie("jwt" ,"" , {maxAge : 0} )
       res.status(200).json({message : "Logged out succesfully"})
        
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const signup = async (req , res)=>{
    try {
    const {fullName  , username , password , confirmPassword , gender} = req.body; 
    if(password!=confirmPassword) {
        return res.status(400).json({error : "Passwords doesn't match"});
    }
    
    //checking if user already exsisiting in the database
    const user = await User.findOne({username})
    if(user){
        return res.status(400).json({error : "user already exsists"})
    }

    //hash password here 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
        fullName ,
        username ,
        password : hashedPassword,
        gender ,
        profilePic : gender== "male" ? boyProfilePic : girlProfilePic
    })

   if(newUser){ 
    //generate jwt token
    generateTokenAndSetCookie(newUser._id  , res)
    await newUser.save();

    res.status(201).json({
        _id : newUser._id,
        fullName : newUser.fullName,
        username : newUser.username,
        gender : newUser.gender,
        profilePic : newUser.profilePic
    })
   }else{
    res.status(400).json({error : "Invalid signup data"})
   }

    } catch (error) {
        console.log("error in signup controller" , error.message);
        res.status(500).json({error: error.message});
    }
}
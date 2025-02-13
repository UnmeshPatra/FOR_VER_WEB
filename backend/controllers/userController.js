import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const loginUser = async (req, res) => {
  // Implement login logic here
  try {
    const {email,password} = req.body;

    const user = await userModel.findOne({email});
    if (!user) {
        return res.status(400).json({ success: false, message: "User does not exists" });
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(isMatch){
        const token = createToken(user._id)
        res.json({
            success:true,
            token
        })
    }else{
        res.json({
            success:false,
            message:'Invalid password'
        })
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message }); 
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validate email and strong password
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email" });
      }
      

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Please enter a strong password of at least 8 characters" });
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  // Implement admin login logic here
  try {
    const {email,password} = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password,process.env.JWT_SECRET)
      res.json({success:true,token})
    } else {
      console.log(error);      
      res.json({success:false,message: error.message });      
    }
  } catch (error) {
    
  }
};

export { loginUser, registerUser, adminLogin };
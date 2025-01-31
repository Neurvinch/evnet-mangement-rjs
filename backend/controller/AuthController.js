const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');


const register = async( req,res) =>{
    try {  

        const { name , email , password } = req.body ;
        const user = await User.create({
            name , email , password})
            
            const token = jwt.verify( {id : user._id }, process.env.JWT_SECRET , {
                expiresIn : '1d'
            });

            res.status(200).json({ user , token});
        
    } catch (error) {
        
        res.status(400).json({ msg : error.message });
    }
};


const login = async( req,res) =>{
    const {email,password} = req.bpdy;
    const user = await User.findOne({email});

    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({msg : "Invalid credentials"});

    }

    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET , {
        expiresIn : '1d'
    });

    res.status(200).json({user , token});



}
module.exports = {register , login};
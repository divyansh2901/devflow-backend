import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async(req,res) => {
    try {
        const {name,email,password} = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {email},
        });

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        //generate token
        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,{
                expiresIn: "7d",
            }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch(error){
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const loginUser = async(req,res) => {
    try {
        const {email, password} = req.body;

        const user = await prisma.user.findUnique({
            where: {email},
        });

        if(!user){
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // generating token
        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            { expiresIn: "7d", }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};
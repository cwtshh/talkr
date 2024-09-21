import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import Conversation from "../models/Conversation";
import Message from "../models/Message";

const secret = process.env.JWT_SECRET as string;
console.log(secret);

const generate_token = (user_id: string): string => {
    return jwt.sign({ id: user_id }, secret, {
        expiresIn: "1d"
    });
}

interface RegisterDataInterface {
    name: string,
    email: string,
    password: string,
    number: string,
};

const register_user = async(req: Request, res: Response) => {
    const user_data: RegisterDataInterface = req.body;
    if(await User.findOne({ email: user_data.email })) {
        return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt();
    const hashed_password = await bcrypt.hash(user_data.password, salt);
    const new_user = await User.create({
        name: user_data.name,
        email: user_data.email,
        password: hashed_password,
        number: user_data.number,
    });
    if(!new_user) {
        return res.status(400).json({ message: "Error creating user" });
    }
    return res.status(201).json({ message: "User created successfully" });
}

interface LoginDataInterface {
    email: string,
    password: string,
};

const login_user = async(req: Request, res: Response) => {
    const login_data: LoginDataInterface = req.body;
    const user = await User.findOne({ email: login_data.email});
    if(!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const is_match = await bcrypt.compare(login_data.password as string, user.password as string);
    if(!is_match) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generate_token(String(user._id));
    return res.cookie('auth_token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true
    }).status(200).json({ message: "Login successful", user: {
        name: user.name,
        email: user.email,
        number: user.number
    }});
};

const logout_user = async(req: Request, res: Response) => {
    return res.clearCookie('auth_token').status(200).json({ message: "Logout successful" });
}

interface SendMessageDataInterface {
    text: string,
    receiver: string,
    sender: string,
    conversation_id: string,
};

const add_contacts = async(req: Request, res: Response) => {
    const { user_id, contact_id } = req.body;
    const user = await User.findById(user_id);
    if(!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const contact = await User.findById(contact_id);
    if(!contact) {
        return res.status(400).json({ message: "Contact not found" });
    }
    user.contacts.push(contact_id);
    await user.save();
    return res.status(200).json({ message: "Contact added successfully" });
}

const get_my_contacts = async(req: Request, res: Response) => {
    const { user_id } = req.query;
    const user = await User.findById(user_id);
    if(!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const contacts = await User.find({ _id: { $in: user.contacts } });
    return res.status(200).json({ contacts });
}

const get_all_users = async(req: Request, res: Response) => {
    const users = await User.find({}).select('name email number');
    return res.status(200).json({ users });
}

const create_conversation = async(sender_id: string, receiver_id: string) => {
    const conversation = await Conversation.create({
        user: sender_id,
        messages: [],
    });
    return conversation;
}

const send_message = async(req: Request, res: Response) => {
    const message_data: SendMessageDataInterface = req.body;
    const new_message = await Message.create({
        text: message_data.text,
        sender: message_data.sender,
        receiver: message_data.receiver,
    });

    const conversation = await Conversation.findById(message_data.conversation_id);
    if(!conversation) {
        return res.status(400).json({ message: "Conversation not found" });
    }
    conversation.messages.push(new_message._id as unknown as import("mongoose").Schema.Types.ObjectId);

    

};


export {
    register_user,
    login_user,
    logout_user,
    add_contacts,
    get_all_users
};
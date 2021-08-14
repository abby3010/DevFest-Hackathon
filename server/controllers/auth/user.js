import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../databaseModels/User.js';

var expiry = "20d";

const dataModule = (user) => {
    return {
        email: user.email,
        firstName: user.firstName,
        imageUrl: user.imageUrl,
        lastName: user.lastName,
        uid: user._id,
        privateKey: user.privateKey,
        termsAgreed: user.termsAgreed
    };
}

export const login = async (req, res) => {
    const { email, password, rememberMe } = req.body;
    try {

        // Check if the user exists or not in the database
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) return res.status(404).json({ message: "Email not found! Sign up instead." });

        // Check if the user has signUp using Google account
        if (existingUser.password === undefined || existingUser.password === null)
            return res.status(300).json({ message: "Sign in using Google account." });

        // Check if Password is correct
        const validPassword = await bcrypt.compare(password, existingUser.password)
        if (!validPassword) return res.status(400).json({ message: "Invalid password" });

        // If rememberMe is checked set the token expiresIn to 20 days otherwise 2 h
        if (rememberMe) { expiry = "2h"; }

        // Create and Assign a Token
        const token = jwt.sign(
            { id: existingUser.privateKey, email: existingUser.email },
            process.env.TOKEN_URI,
            { expiresIn: expiry }
        );

        return res.status(200).json({ message: "Welcome! Signup Successful.", result: dataModule(existingUser), token: token });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong." });
    }
}


/*************************************************************
 * SignUp User
 *************************************************************/
export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, rememberMe } = req.body;
    try {

        // Check if the user is already created in the database
        const existingUser = await User.findOne({ email: email });
        if (existingUser) return res.status(400).json({ message: "Email already have been used!" });

        if (password !== confirmPassword) return res.status(400).json({ message: "Password and confirm password do not match." });

        // Hash the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(confirmPassword, salt);

        const privateKey = await bcrypt.hash(email + firstName + lastName, salt);

        const result = await User.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            privateKey: privateKey,
            imageUrl: process.env.DEFAULT_PROFILE,
            
        });

        // If rememberMe is checked set the token expiresIn to 20 days otherwise 2 h
        if (rememberMe) { expiry = "2h"; }

        // Create and Assign a Token
        const token = jwt.sign(
            { id: result.privateKey, email: result.email },
            process.env.TOKEN_URI,
            { expiresIn: expiry }
        );

        return res.status(200).json({ message: "Welcome! Signup Successful.", result: dataModule(result), token: token });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong.", error: error });
    }

}


/*************************************************************
 * Google Login User
 *************************************************************/
export const googleAuth = async (req, res) => {
    const { email, firstName, lastName, imageUrl, rememberMe } = req.body;
    try {

        var newUser = false;
        // Check if the user is new user
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) newUser = true;

        var result = existingUser;

        const salt = await bcrypt.genSalt(12);
        const privateKey = await bcrypt.hash(email + firstName + lastName, salt);

        if (newUser) {
            result = await User.create({
                email: email,
                firstName: firstName,
                lastName: lastName,
                imageUrl: imageUrl,
                privateKey: privateKey
            });
        }

        // If rememberMe is checked set the token expiresIn to 20 days otherwise 2 h
        if (rememberMe) { expiry = "2h"; }

        // Create and Assign a Token
        const token = jwt.sign(
            { id: result.privateKey, email: result.email },
            process.env.TOKEN_URI,
            { expiresIn: expiry }
        );

        return res.status(200).json({ message: "Welcome! Login Successful.", result: dataModule(result), newUser: newUser, token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong.", error: error });
    }

}
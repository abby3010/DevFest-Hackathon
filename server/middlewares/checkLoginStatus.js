import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const checkLoginStatus = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        // if length is greater then 500 user logged through Google otherwise conventional login/signup
        const isCustom = token.length < 500;

        let decodedData;

        if (token && isCustom) {
            decodedData = jwt.verify(token, process.env.TOKEN_URI, function (err, token) {
                if (err) {
                    return res.status(403).json({ message: "Not logged in!", error: error, success: false });
                }
                else {
                    req.userId = token.id;
                }
            });

        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData.sub;
        }

        next();

    } catch (error) {
        return res.status(403).json({ message: "Not logged in!", error: error, success: false });
    }
}

export default checkLoginStatus;
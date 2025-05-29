import jwt from 'jsonwebtoken';
const generateAccessTokenAndCookie = (user, res) => {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30m"
    });
    console.log('jwt token: ', token);
    res.cookie("jwt", token, {
        httpOnly: true, // prevent XSS cors site scripting
        sameSite: "strict", // CSRF
        secure: process.env.NODE_ENV !== "development" // HTTPS
    });
    return token;
};
export default generateAccessTokenAndCookie;

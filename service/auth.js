const sessionidtoUsermap = new Map(); // Use `Map` with an uppercase 'M'
const  jwt = require('jsonwebtoken');
const secretkey = "mysecret@123";

function setUser(id,user) {
    sessionidtoUsermap.set(id, user);
    // const payload = {
    //     ...user,
    // };
    // return jwt.sign({
    //     _id: user._id,
    //     email: user.email,
    // }, secretkey);
}

function getUser(id) {
//  if(!token) return null;
//     try {
//         return jwt.verify(token, secretkey);
//     } catch (error) {
//         return null;
//     }
    return sessionidtoUsermap.get(id);
}

module.exports = { setUser, getUser }; // Ensure correct export syntax

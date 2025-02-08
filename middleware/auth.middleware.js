const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            res.status(400).send({ msg: "Please login first!" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded);
        req.body.userId = decoded.userId
        req.body.user = decoded.user
        next()
    } catch (error) {
        console.log(error);
        res.status(400).send({ error })
    }
}
module.exports = { auth }
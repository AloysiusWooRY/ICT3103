const jwt = require('jsonwebtoken')
const Account = require('../models/accountModel')

const requireAuth = (isAdmin = false) => async (req, res, next) => {

    // Verify authentication
    const { authorization } = req.headers
    if (!authorization) return res.status(401).json({ error: 'Invalid authorization token' })

    const token = authorization.split(' ')[1]
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        const account = await Account.findOne({ _id }).select('_id isAdmin')
        req.account = account

        if (isAdmin && !account.isAdmin) {
            return res.status(401).json({ Error: "Unauthorized admin access" });
        }

        next()
    } catch (err) {
        if (err.name === "TokenExpiredError") return res.status(401).json({ error: "Unauthorized access (Expired Token)", Expired: true })
        res.status(401).json({ error: "Unauthorized access" })
    }

}

module.exports = requireAuth
const Token = require('./token.auth')
const BlackList = require('../Models/BlackList')

const middleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    const CheckBlacklist = await BlackList.findOne({
      where: {
        token: authorization
      }
    })
    if (CheckBlacklist) { return res.status(400).json({ error: 'Token is blacklisted' }) }
    const checked = await Token.check(authorization)

    

    if (!checked) { return res.status(400).json({ error: "Token not found" }) }
    
    next()
  } catch (error) {
    console.log(error.name)
    switch (error.name) {
      case 'TokenExpiredError':
        return res.status(400).json({ error: error.message })
        break;
      case 'JsonWebTokenError':
        return res.status(400).json({ error: error.message })
        break;
      case 'NotBeforeError':
        return res.status(400).json({ error: error.message })
        break;
      case 'SyntaxError':
        return res.status(400).json({ error: error.message })
        break;
      default:
        return res.status(400).json({ error: error.message })
        break;
    }
  }
}

module.exports = middleware
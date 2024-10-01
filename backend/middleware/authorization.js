import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(404).json({ message: 'Unauthorized' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const verifytoken = jwt.verify(token, process.env.JWT_SECRET)
    if (!verifytoken) {
      return res.status(404).json({ message: 'Invalid Token' })
    }
    req.user = verifytoken
    next()
  } catch (error) {
    console.log('Error in authorization')
    res.status(404).json({ message: error.message })
  }
}

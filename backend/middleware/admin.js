export const isAdmin = (req, res, next) => {
  const role = req.user.role
  //console.log({ role })

  if (req.user.role !== 'admin') {
    return res.status(404).json({ error: 'Forbidden: Access denied' })
  }
  next()
}

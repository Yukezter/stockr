module.exports = {
  getHome: (req, res, next) => {
    res.json({ 200: 'Home!' })
  }
}
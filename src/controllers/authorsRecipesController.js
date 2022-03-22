module.exports = {
    index: (req, res) => {
      res.render('pages/authorsRecipes/index.html.ejs', {author: req.user})
    },
  }  
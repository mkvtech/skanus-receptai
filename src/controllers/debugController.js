module.exports = {
  show: (req, res) => {
    res.send({
      ok: 'ok',
      params: req.params,
      reqKeys: Object.keys(req),
      reqStriped: {
        authentication: req.authentication,
        anonymous: req.anonymous,
        user: req.user,
      },
    })
  },
}

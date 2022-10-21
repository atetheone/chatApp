module.exports = function(app, ensureAuthenticated) {
  app.get('/chat',
  ensureAuthenticated,
  (req, res) => {
    res.render(
      process.cwd() + '/views/pug/chat', {
      user: req.user
    });
  });
}

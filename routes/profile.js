module.exports = function (app, ensureAuthenticated) {
  app.get('/profile',
    ensureAuthenticated,
    (req, res) => {
      res.render(
        process.cwd() + '/views/pug/profile',
        {
          username: req.user.username
        }
      );
    }
  );
}
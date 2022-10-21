module.exports = function (app) {
  app.get('/logout',
    (req, res, next) => {
      req.logout(
        (err) => {
          if (err) return next(err);
          res.redirect('/');
        }
      );
    }
  );
}
exports.getUser = (req, res, next) => {
  res.send(req.user);
};

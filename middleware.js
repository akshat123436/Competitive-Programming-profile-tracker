const { User } = require("./models/user");

module.exports = {
  isLoggedin: (req, res, next) => {
    if (!req.user) {
      req.flash("error", "Please login");
      return res.redirect("/login");
    }
    next();
  },
  isOwner: async (req, res, next) => {
    const { id } = req.params;

    const userr = await User.findById(req.user._id);

    for (let collection of userr.collections) {
      if (collection.toString() === id.toString()) {
        return next();
      }
    }
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      req.flash("error", "Please login again to access");
      return res.redirect("/login");
    });
  },
};

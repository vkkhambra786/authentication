const authorise = (all) => {
  return (req, res, next) => {
    const user = req.user;
    let isAllowed = false;

    for (let i = 0; i < user.roles.length; i++) {
      if (all.includes(user.roles[i])) {
        isAllowed = true;
        break;
      }
    }

    if (isAllowed) {
      next();
    } else {
      return res.status(403).send({ message: "Permission is not allowed" });
    }
  };
};

module.exports = authorise;

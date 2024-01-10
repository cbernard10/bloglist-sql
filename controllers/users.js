const router = require("express").Router();

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll(
    {
      include: [
        {
          model: Blog,
          attributes: ["title", "author", "url", "likes"],
        },
      ],
    },
    { attributes: ["username", "name"] }
  );
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const where = {};
  if (req.query.read) {
    where.read = req.query.read === "true";
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: Blog,
        as: "blog_user_readings",
        attributes: ["id", "title", "author", "url", "likes", "year"],
        through: {
          attributes: ["read", "id"],
          where,
        },
      },
    ],
  });
  res.json(user);
});

router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  if (user) {
    user.username = req.body.username;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.delete("/:username", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  if (user) {
    await user.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = router;

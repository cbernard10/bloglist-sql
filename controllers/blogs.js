const router = require("express").Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { Op } = require("sequelize");

const { Blog, User } = require("../models");

const { tokenExtractor, isValidSession } = require("../util/middleware");

router.get("/", async (req, res) => {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search,
          },
        },
        {
          author: {
            [Op.substring]: req.query.search,
          },
        },
      ],
    };
  }

  const blogs = await Blog.findAll({
    order: [["likes", "DESC"]],
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["username", "name"],
    },
    where,
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, isValidSession, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
  });
  return res.json(blog);
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.delete("/:id", [blogFinder, tokenExtractor, isValidSession], async (req, res, next) => {
  if (req.blog) {
    const user = await User.findByPk(req.decodedToken.id);
    if (user.id !== req.blog.userId) {
      return res.status(401).json({ error: "unauthorized" });
    }
    await req.blog.destroy();
  }
  res.status(204).end();
});

router.put("/:id", blogFinder, async (req, res, next) => {
  if (req.blog && req.body.likes) {
    req.blog.likes = req.body.likes;

    await req.blog.save();
    console.log(req.blog.toJSON());
    res.json(req.blog);
  } else {
    res.status(204).end();
  }
});

module.exports = router;

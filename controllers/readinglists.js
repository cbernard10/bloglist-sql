const router = require("express").Router();

const { ReadingList, User } = require("../models");
const { tokenExtractor, isValidSession } = require("../util/middleware");

router.post("/", async (req, res) => {
  const blogId = req.body.blogId;
  const userId = req.body.userId;
  const readingList = await ReadingList.create({
    blogId,
    userId,
  });
  res.json(readingList);
});

router.put("/:id", tokenExtractor, isValidSession, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (user.id !== req.body.userId) {
    return res.status(401).json({ error: "Not authorized" });
  }
  const read = req.body.read;
  const readingList = await ReadingList.update(
    { read },
    { where: { id: req.params.id } }
  );
  res.json(readingList);
});

module.exports = router;

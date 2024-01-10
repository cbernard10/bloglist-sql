const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const User = require("../models/user");
const ActiveSession = require("../models/active_session");

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });

  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  try {
    await ActiveSession.create({
      token,
      userId: user.id,
    });
  } catch (error) {
    console.log(error);
  }

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;

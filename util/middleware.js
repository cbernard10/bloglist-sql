const jwt = require("jsonwebtoken");
const { SECRET } = require("./config.js");
const ActiveSession = require("../models/active_session");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

const isValidSession = async (req, res, next) => {
  console.log("checking validity of session");
  let activeSession;
  try {
    activeSession = await ActiveSession.findOne({
      where: {
        token: req.decodedToken,
      },
    });
  } catch (error) {
    console.log('could not find active session');
  }
  if (!activeSession) {
    return res.status(401).json({ error: "invalid session" });
  }
  console.log("session is valid");
  next();
};

module.exports = { tokenExtractor, isValidSession };

const router = require("express").Router();

const ActiveSession = require("../models/active_session");
const { tokenExtractor, isValidSession } = require("../util/middleware");

router.delete(
  "/",
  tokenExtractor,
  //   isValidSession,
  async (request, response) => {
    const activeSessions = await ActiveSession.findAll({
      where: {
        userId: request.decodedToken.id,
      },
    });

    if (activeSessions) {
      activeSessions.forEach(async (session) => {
        await session.destroy();
      });
    }
    response.status(204).end();
  }
);

module.exports = router;

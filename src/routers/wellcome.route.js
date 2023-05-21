const { Router } = require("express");
const wellcomeRouter = Router();
const wellcomeController = require("../controllers/wellcome.controller");

const notification = require("../utils/notification");

wellcomeRouter.get("/", wellcomeController.wellcomePage);

wellcomeRouter.post("/notification", (req, res) => {
  const { body } = req;

  notification
    .send(body.token, {
      title: "Remote",
      body: "From Backend",
    })
    .then(() =>
      res.status(200).json({
        msg: "OK",
      })
    )
    .catch((err) => {
      console.log(err);
    });
});

module.exports = wellcomeRouter;
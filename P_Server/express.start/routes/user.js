const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/views/user");
});

module.exports = router;

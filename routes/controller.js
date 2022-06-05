const { makeGetRequest, makeSingleGetRequest } = require("../model/get");
const { makePostRequest } = require("../model/post");
const { makePutRequest } = require("../model/put");
const { makeDeleteRequest } = require("../model/delete");
const { verifyUser } = require("../auth/auth");
const express = require("express");
const router = express.Router();
router.use(express.static(__dirname + "/crud"));

router.use(verifyUser, (req, res, next) => {
  var { e_mail } = req.token;
  if (e_mail) {
    next();
  } else {
    return res.redirect("/");
  }
});
router.get("/", async (req, res) => res.render("crud/crud"));

router.get("/get", async (req, res) => {
  var data = await makeGetRequest(req, res);
  res.status(200).send(data);
});
router.post("/post", async (req, res) => {
  var data = await makePostRequest(req, res);
  res.status(200).send(data);
});
router.put("/put", async (req, res) => {
  var data = await makePutRequest(req, res);
  res.status(200).send(data);
});
router.delete("/delete", async (req, res) => {
  var data = await makeDeleteRequest(req, res);
  res.status(200).send(data);
});
router.post("/getSingle", async (req, res) => {
  var data = await makeSingleGetRequest(req, res);
  res.status(200).send(data);
});

module.exports = router;

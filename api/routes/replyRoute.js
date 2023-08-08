const express = require("express");
const router = express.Router();
const {
  createReply,
  deleteReply,
  getReply,
  updateReply,
} = require("../controllers/replyController");

router.post("/:commentid", createReply);
router.delete("/:id", deleteReply);
router.put("/:id", updateReply);
router.get("/find/:commentId", getReply);

module.exports = router;

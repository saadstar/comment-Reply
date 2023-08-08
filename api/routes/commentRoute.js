const express = require("express")
const router = express.Router();
const {
  allComments,
  createComment,
  deleteComment,
  updateComment,
  getComment,
} = require("../controllers/commentController");

router.get("/",allComments);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
router.get("/reply/:id", getComment);

module.exports = router;
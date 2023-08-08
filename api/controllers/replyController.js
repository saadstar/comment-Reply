const asyncHandler = require("express-async-handler");
const Reply = require("../model/ReplyModel");
const Comment = require("../model/CommentModel");


const createReply = asyncHandler(async (req, res) => {
  const commentId = req.params.commentid;
  const newReply = new Reply(req.body);
  try {
    const savedReply = await newReply.save();
    try {
      await Comment.findByIdAndUpdate(commentId,{$push:{replies:savedReply._id}});
    } catch (err) {
      res.status(401).json(err);
    }
  res.status(200).json(savedReply);
  } catch (err) {
    res.status(401).json(err);
  }
});

const deleteReply = asyncHandler(async (req, res) => {
     try {
         await Reply.findByIdAndDelete(req.params.id);
       res.status(200).json("Reply has been Deleted Successfuly.");
     } catch (err) {
       res.status(401).json("Error in deleting a new reply!");
     }
});

const getReply = asyncHandler(async (req, res) => {
    try {
        const replyer = await Reply.find({ commentId: req.params.commentId })
        res.status(200).json(replyer);
    } catch (err) {
        res.status(401).json("Error in Getting Reply!");
    }
});

const updateReply = asyncHandler(async (req, res) => {
    try {
  const updatedReply = await Reply.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {new: true }
  );
  res.status(200).json(updatedReply);
} catch (err) {
  res.status(401).json("Error in Updating Reply!");
    }
});


module.exports = { createReply, deleteReply, getReply, updateReply };
const asyncHandler = require("express-async-handler");
const Comment = require("../model/CommentModel");
const Reply = require("../model/ReplyModel");

// @GET
const allComments = asyncHandler(async (req, res) => {
    try {
        const comments = await Comment.find({})
        res.status(200).json(comments);        
    }
    catch (err) {
        res.status(500).json("Error in Fetching All Comments!");
    }
})
// @POST 
const createComment = asyncHandler(async (req, res) => {
    try {
        const newComment = await new Comment(req.body).save();
        res.status(200).json(newComment);
    } catch (err) {
        console.log("error in posting a comment!")
    }
});

//@PUT
const updateComment = asyncHandler(async (req, res) => {
    
    try {
        const updateddComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateddComment);
    } catch (err) {
        res.status(401).json(err);
    }
});

//@DELETE
const deleteComment = asyncHandler(async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted Successfully.");
    } catch (err) {
        res.status(200).json(err);
    }
});

// @GET one
const getComment = asyncHandler(async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const list = await Promise.all(comment.replies.map((reply) => {
            return Reply.findById(reply);
        }))
        res.status(200).json(list);
    } catch (err) {
        res.status(401).json(err);
    }
})


module.exports = {
  allComments,
  createComment,
  updateComment,
  deleteComment,
  getComment,
};
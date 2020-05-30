const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  console.log("posts route");
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (message) {
    res.json({ message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (post) {
      res.json(post);
    } else {
      throw err;
    }
  } catch (message) {
    res.json({ message: "Item not found" });
  }
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const post = new Post({
    title,
    description,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.json({ message: err });
  }
});

router.patch("/id", async (req, res) => {
  try {
    const updatedPost = Post.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );

    res.json(updatedPost);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removed = await Post.remove({ _id: req.params.id });
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.json({ message: error });
  }
});
module.exports = router;

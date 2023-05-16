const express = require("express");
const router = express.Router();
const Post = require("./posts-model.js");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Gönderiler alınamadı" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Post.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
    }
  } catch (err) {
    res.status(500).json({ message: "Gönderi bilgisi alınamadı" });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.contents) {
      res
        .status(400)
        .json({
          message: "Lütfen gönderi için bir title ve contents sağlayın",
        });
    } else {
    const {id} = await Post.insert(req.body);
    const newPost = await Post.findById(id);
      res.status(201).json(newPost);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});

router.put("/:id", async (req, res) => {
    try {
      const user = await Post.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
      } else if(!req.body.title || !req.body.contents) {
        res
        .status(400)
        .json({
          message: "Lütfen gönderi için bir title ve contents sağlayın",
        });
      } else {
        await Post.update(req.params.id, req.body);
        const updatePost = await Post.findById(req.params.id);
        res
        .json(updatePost)
      }
    } catch (err) {
      res.status(500).json({ message: "Gönderi bilgisi alınamadı" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const user = await Post.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" });
      } else {
        const deletePost = await Post.findById(req.params.id);
        await Post.remove(req.params.id);
        res
        .json(deletePost);
      }
    } catch (err) {
      res.status(500).json({ message: "Gönderi silinemedi" });
    }
  });


  router.get("/:id/comments", async (req, res) => {
    try {
      const user = await Post.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "Girilen ID'li gönderi bulunamadı." });
      } else {
        const post = await Post.findPostComments(req.params.id);
        res
        .json(post);
      }
    } catch (err) {
      res.status(500).json({ message: "Yorumlar bilgisi getirilemedi" });
    }
  });



module.exports = router;

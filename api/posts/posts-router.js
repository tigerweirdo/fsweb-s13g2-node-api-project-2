const router = require("express").Router();
const postModel = require("./posts-model")


router.get("/", async (req,res)=>{
  try {
    const allposts = await postModel.find()
    res.json(allposts);
    
  } catch (error) {
    res.status(500).json({ message: "Gönderiler alınamadı" })
    
  }

})
router.get("/:id", async (req,res)=>{
  try {
    const post = await postModel.findById(req.params.id)
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })

      
    } else {
      res.json(post)
      
    }
    
  } catch (error) {
    res.status(500).json({ message: "Gönderiler alınamadı" })
    
  }

})

router.post("/", async (req,res)=>{
  try {
    const {title,contents}=req.body
    if (!title||!contents) {
      res.status(400).json({ message: "Lütfen gönderi için bir title ve contents sağlayın" })
    } else {
      const insertedID = await postModel.insert({title:title, contents:contents});
      const newpost = await postModel.findById(insertedID.id);
      res.status(201).json(newpost);
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderiler alınamadı" })
  }
})


router.put("/:id", async (req,res)=>{
  try {
    const post = await postModel.findById(req.params.id)
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })
    } else {
      const {title,contents} = req.body
      if(!title||!contents){
        res.status(400).json({ message: "Lütfen gönderi için title ve contents sağlayın" })
      }
      else{
        await postModel.update(req.params.id,{title:title,contents:contents})
        const newpost = await postModel.findById(req.params.id)
        res.status(200).json(newpost)


      }
    }
  } catch (error) {
    res.status(500).json({ message: "Gönderiler alınamadı" })
  }
})


router.delete("/:id", async (req,res)=>{
  try {
    const post = await postModel.findById(req.params.id)
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })

      
    } else {
      await postModel.remove(post.id)
      res.json(post)
      
    }
    
  } catch (error) {
    res.status(500).json({ message: "Gönderiler alınamadı" })
    
  }

})

router.get("/:id/comments", async (req,res)=>{
  try {
    const post = await postModel.findById(req.params.id)
    if (!post) {
      res.status(404).json({ message: "Belirtilen ID'li gönderi bulunamadı" })

      
    } else {
      const comment = await postModel.findPostComments(req.params.id)
      res.json(comment)
      
    }
    
  } catch (error) {
    res.status(500).json({ message: "Gönderiler alınamadı" })
    
  }

})






module.exports = router

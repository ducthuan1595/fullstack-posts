import { PostModel } from "../models/postModel.js";

const getPosts = async(req, res) => {
  try{
    // test post posts
    // const post = new PostModel({
    //   title: 'test',
    //   content: 'test',
    //   author: 'test'
    // });
    // post.save();

    const posts = await PostModel.find();
    console.log('posts', posts);
    res.status(200).json(posts);
  }catch(err) {
    res.status(500).json({ error: err});
  }
};

const createPost = async(req, res) => {
  try{
    const newPost = req.body;
    const post = new PostModel(newPost);
    await post.save();

    res.status(200).json(post);
  }catch(err) {
    res.status(500).json({ error: err })
  }
};

const updatePost = async(req, res) => {
  try{
    const updatePost = req.body;
    const post = await PostModel.findOneAndUpdate({ _id: updatePost._id}, updatePost, { new: true } );

    res.status(200).json(post);
  }catch(err) {
    res.status(500).json({ error: err })
  }
}

const deletePost = async(req, res) => {
  try{
    const updatePost = req.body;
    const post = await PostModel.findById(updatePost._id);
    await post.deleteOne();

    res.status(200).json(post);
  }catch(err) {
    res.status(500).json({ error: err })
  }
}

export {
  getPosts,
  createPost,
  updatePost,
  deletePost
}
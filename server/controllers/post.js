import Category from '../models/category';
import Post from '../models/post';
import User from '../models/user';
import Media from '../models/media';
import Comment from '../models/comment';
import cloudinary from 'cloudinary';
import slugify from 'slugify';
import { response } from 'express';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export const uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image);

    res.json(result.secure_url);
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, categories } = req.body;
    const alreadyExists = await Post.findOne({
      slug: slugify(title.toLowerCase())
    });

    if (alreadyExists) return res.json({ error: 'title is taken' });

    let ids = [];
    for (let i = 0; i < categories.length; i++) {
      Category.findOne({
        name: categories[i]
      }).exec((err, data) => {
        if (err) return console.log(err);
        ids.push(data._id);
      });
    }

    // save post
    setTimeout(async () => {
      try {
        const post = await new Post({
          ...req.body,
          slug: slugify(title),
          categories: ids,
          postedBy: req.user._id
        }).save();

        // push postId to user's posts array
        await User.findByIdAndUpdate(req.user._id, {
          // $addToSet skips dupes, $push will possibly add duplicate ids
          $addToSet: { posts: post._id }
        });

        return res.json(post);
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

// export const posts = async (req, res) => {
//   try {
//     const all = await Post.find()
//       .populate('featuredImage')
//       .populate('postedBy', 'name')
//       .populate('categories', 'name slug')
//       .sort({ createdAt: -1 });

//     res.json(all);
//   } catch (err) {
//     console.log(err);
//   }
// };

export const posts = async (req, res) => {
  try {
    const limit = 6;
    const page = req.params.page || 1;
    const all = await Post.find()
      .skip((page - 1) * limit)
      .populate('featuredImage')
      .populate('postedBy', 'name')
      .populate('categories', 'name slug')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(all);
  } catch (err) {
    console.log(err);
  }
};

export const uploadImageFile = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.file.path);
    const media = await new Media({
      url: result.secure_url,
      public_id: result.public_id,
      postedBy: req.user._id
    }).save();

    res.json(media);
  } catch (error) {
    console.log(err);
  }
};

export const media = async (req, res) => {
  try {
    const media = await Media.find()
      .populate('postedBy', '_id')
      .sort({ createdAt: -1 });
    res.json(media);
  } catch (err) {
    console.log(err);
  }
};

export const removeMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const singlePost = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug })
      .populate('postedBy', 'name')
      .populate('categories', 'name slug')
      .populate('featuredImage', 'url');

    const comments = await Comment.find({ postId: post._id })
      .populate('postedBy', 'name')
      .sort({ createdAt: -1 });

    res.json({ post, comments });
  } catch (err) {
    console.log(err);
  }
};

export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content, featuredImage, categorries } = req.body;

    let ids = [];
    for (let i = 0; i < categories.length; i++) {
      Category.findOne({
        name: categories[i]
      }).exec((err, data) => {
        if (err) return console.log(err);
        ids.push(data._id);
      });
    }

    // save updated post
    setTimeout(async () => {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          title,
          slug: slugify(title),
          content,
          categories: ids,
          featuredImage
        },
        { new: true }
      )
        .populate('postedBy', 'name')
        .populate('categories', 'name slug')
        .populate('featuredImage', 'url');

      res.json(post);
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

export const postsByAuthor = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user._id })
      .populate('postedBy', 'name')
      .populate('categories', 'name slug')
      .populate('featuredImage', 'url')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const postCount = async (req, res) => {
  try {
    const count = await Post.countDocuments();
    res.json(count);
  } catch (err) {
    console.log(err);
  }
};

export const postsForAdmin = async (req, res) => {
  try {
    const posts = await Post.find().select('title slug');
    res.json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    let newComment = await new Comment({
      content: comment,
      postedBy: req.user._id,
      postId
    }).save();

    newComment = await newComment.populate('postedBy', 'name');
    res.json(newComment);
  } catch (err) {
    console.log(err);
  }
};

export const comments = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page || 1;
    const allComments = await Comment.find()
      .skip((page - 1) * perPage)
      .populate('postedBy', 'name')
      .populate('postId', 'title slug')
      .sort({ createdAt: -1 })
      .limit(perPage);

    return res.json(allComments);
  } catch (err) {
    console.log(err);
  }
};

export const commentCount = async (req, res) => {
  try {
    const count = await Comment.countDocuments();

    res.json(count);
  } catch (err) {
    console.log(err);
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    res.json(updatedComment);
  } catch (err) {
    console.log(err);
  }
};

export const removeComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const userComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postedBy: req.user._id })
      .populate('postedBy', 'name')
      .populate('postId', 'title slug')
      .sort({ createdAt: -1 });

    return res.json(comments);
  } catch (err) {
    console.log(err);
  }
};

export const getNumbers = async (req, res) => {
  try {
    const posts = await Post.countDocuments();
    const users = await Users.countDocuments();
    const comments = await Comment.countDocuments();
    const categories = await Category.countDocuments();

    return res.json({ posts, users, comments, categories });
  } catch (err) {
    console.log(err);
  }
};

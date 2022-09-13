import Category from '../models/category';
import Post from '../models/post';
import Media from '../models/media';
import cloudinary from 'cloudinary';
import slugify from 'slugify';

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

        return res.json(post);
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};

export const posts = async (req, res) => {
  try {
    const all = await Post.find()
      .populate('featuredImage')
      .populate('postedBy', 'name')
      .populate('categories', 'name slug')
      .sort({ createdAt: -1 });

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

    res.json(post);
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

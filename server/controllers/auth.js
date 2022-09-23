const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../helpers/auth');
const nanoid = require('nanoid');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: 'Name is required'
      });
    }
    if (!email) {
      return res.json({
        error: 'Email is required'
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: 'Password is required and should be 6 characters long'
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: 'Email is taken'
      });
    }

    const hashedPassword = await hashPassword(password);

    try {
      const user = await new User({
        name,
        email,
        password: hashedPassword
      }).save();

      // create signed token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });

      const { password, ...rest } = user._doc;
      return res.json({
        token,
        user: rest
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: 'No user found'
      });
    }
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: 'Wrong password'
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error. Try again.');
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log('USER ===> ', user);
  if (!user) {
    return res.json({ error: 'User not found' });
  }
  const resetCode = nanoid(5).toUpperCase();
  user.resetCode = resetCode;
  user.save();

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: 'Password reset code',
    html: `<h1>Your password  reset code is: ${resetCode}</h1>`
  };
  // send email
  try {
    const data = await sgMail.send(emailData);
    console.log(data);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.json({ ok: false });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, password, resetCode } = req.body;
    const user = await User.findOne({ email, resetCode });
    // if user not found
    if (!user) {
      return res.json({ error: 'Email or reset code is invalid' });
    }
    // if password is short
    if (!password || password.length < 6) {
      return res.json({
        error: 'Password is required and should be 6 characters long'
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.resetCode = '';
    user.save();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const currentUser = async (req, res) => {
  try {
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, website, checked } = req.body;

    if (!name) {
      return res.json({
        error: 'Name is required'
      });
    }

    if (!email) {
      return res.json({
        error: 'Email Address is required'
      });
    }

    if (!password || password.length < 8) {
      return res.json({
        error: 'Password is required and should be 8 characters long'
      });
    }

    // check to see if user already exists in db
    const exist = await User.findOne({ email });

    if (exist) {
      return res.json({
        error: 'Email Address has already been registered to an existing user'
      });
    }

    // hash pw
    const hashedPassword = await hashPassword(password);

    // send email with login details if checked
    if (checked) {
      const emailData = {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: 'New User Account Created',
        html: `
                <h1>Ahoy, ${name}! Welcome to MERN-CMS App!</h1>
                <p>Your new account has been successfully created, please see below for your login details.</p>
                <h3>Account Details:</h3>
                <p style="color:red;">Email: ${email}</p>
                <p style="color:red;">Password: ${password}</p>
                <small>It is strongly advised to change your password after first-time login.</small>
              `
      };

      try {
        const data = await sgMail.send(emailData);
      } catch (err) {
        console.log(err);
      }
    }

    // create user
    try {
      const user = await new User({
        name,
        email,
        password: hashedPassword,
        role,
        checked,
        website
      }).save();

      const { password, ...rest } = user._doc;
      return res.json(rest);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const users = async (req, res) => {
  try {
    const allUsers = await User.find().select('-password -secret -resetCode');
    res.json(allUsers);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId === req.user._id) return;

    const user = await User.findByIdAndDelete(userId);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const currrentUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('image');
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    const { id, name, email, password, website, role, image } = req.body;
    const userFromDB = await User.findById(id);

    // check for valid email address
    if (!emailValidator.validate(email)) {
      return res.json({ error: 'invalid email' });
    }

    // check if email is taken
    const exist = await User.findOne({ email });

    if (exist && exist._id.toString() !== userFromDB._id.toString()) {
      return res.json({ error: 'email is already taken' });
    }

    // check password length
    if (password && password.length < 8) {
      return res.json({
        error: 'password is required and should be 8 characters long'
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updated = await User.findByIdAndUpdate(
      id,
      {
        name: name || userFromDB.name,
        email: email || userFromDB.email,
        password: hashedPassword || userFromDB.password,
        website: website || userFromDB.website,
        role: role || userFromDB.role,
        image: image || userFromDB.image
      },
      { new: true }
    ).populate('image');

    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};

export const updateUserByUser = async (req, res) => {
  try {
    const { id, name, email, password, website, image } = req.body;
    const userFromDB = await User.findById(id);

    // check if user is self
    if (userFromDB._id.toString() !== req.user._id.toString()) {
      return res.status(403).send('unauthorized');
    }

    // check for valid email address
    if (!emailValidator.validate(email)) {
      return res.json({ error: 'invalid email' });
    }

    // check if email is taken
    const exist = await User.findOne({ email });

    if (exist && exist._id.toString() !== userFromDB._id.toString()) {
      return res.json({ error: 'email is already taken' });
    }

    // check password length
    if (password && password.length < 8) {
      return res.json({
        error: 'password is required and should be 8 characters long'
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updated = await User.findByIdAndUpdate(
      id,
      {
        name: name || userFromDB.name,
        email: email || userFromDB.email,
        password: hashedPassword || userFromDB.password,
        website: website || userFromDB.website,
        image: image || userFromDB.image
      },
      { new: true }
    ).populate('image');

    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};

export const currentUserProfile = async (req, res) => {
  try {
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username === "" || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json("User created");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Invalid credentials"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(404, "Invalid credentials"));
    }

    const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);

    const { password: pass, ...userWithoutPassword } = validUser._doc;

    res.status(200).cookie('access_token', token, { httpOnly: true }).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
      const { password, ...userWithoutPassword } = user._doc;
      res.status(200).cookie('access_token', token, { httpOnly: true }).json(userWithoutPassword);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({ username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4), email, password: hashedPassword, profilePicture: googlePhotoUrl });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);
      const { password, ...userWithoutPassword } = newUser._doc;
      res.status(200).cookie('access_token', token, { httpOnly: true }).json(userWithoutPassword);
    }
  } catch (error) {
    return next(errorHandler(400, 'Google authentication failed'));
  }
};
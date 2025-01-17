import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerUser = async (account_id, user_name, email, password) => {
  const emailExists = await User.findOne({ where: { email: email } });
  if (emailExists)
    return {
      status: 400,
      message: 'A User account with this email already exists',
    };

  //  const salt = await bcrypt.genSalt(10);
  const salt = process.env.SALT;
  const hashedPassword = await bcrypt.hash(password, salt);

  return User.create({
    account_id: account_id,
    user_name: user_name,
    email: email,
    password: hashedPassword,
  })
    .then((savedUser) => {
      return { status: 200, message: savedUser.id };
    })
    .catch((err) => {
      return { status: 500, message: err.message };
    });
};

export const signInUser = async (email, password) => {
  const user = await User.findOne({ where: { email: email } });
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!user) return { status: 400, message: 'Email is not correct' };

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return { status: 400, message: 'Invalid password' };

  const currentTime = Math.floor(Date.now() / 1000);

  /** 1 day =  60 secs * 60 minutes * 24 hours */
  const token = jwt.sign(
    {
      id: user.id,
      exp: currentTime + 60 * 60 * 24,
    },
    JWT_SECRET,
  );

  return {
    id: user.id,
    user_name: user.user_name,
    token: token,
  };
};

export const getAllUsers = async () => {
  return await User.findAll()
    .then((user) => {
      return { status: 200, message: user };
    })
    .catch((err) => {
      return { status: 500, message: err.message };
    });
};

export const getUserById = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return { status: 404, message: 'user not found' };
  } else {
    return { status: 200, user };
  }
};

export const updateUserById = async (userId, id, user_name, role) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return { status: 404, message: 'User not found' };
  } else {
    user.id = id;
    user.user_name = user_name;
    user.role = role;
    await user.save();
    return { status: 200, message: 'user updated successfully', user };
  }
};

export const deleteUserById = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return { status: 404, message: 'user not found' };
  } else {
    await user.destroy();
    return { status: 200, message: 'user deleted  successfully' };
  }
};

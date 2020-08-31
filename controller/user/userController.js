/* eslint-disable no-console */
import { User } from '../../model/user.js';
import { responseFormalize } from '../../helper/response.js';
import { generateToken, generateResetToken } from '../../utils/generateToken.js';
import { logger, readFile } from '../../helper/logger.js';

const loginUser = async (req) => {
  if (!req.body.username || !req.body.password) {
    return responseFormalize(404, 'LOGIN_FAILED', false, 'password and username are required!');
  } else {
    try {
      const data = req.body;
      const result = await User.verifyPassword(data);
      if (!result.error) {
        const token = await generateToken(result.message, 60 * 60);

        return responseFormalize(200, 'TOKEN_GENERATE_SUCCESS', false, '', token);
      } else {
        return responseFormalize(203, 'TOKEN_GENERATE_FAILED', true, result.message);
      }
    } catch (err) {
      logger(`Log In ${err}`);

      return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
    }
  }
};

const getUserDetail = async (req) => {
  try {
    const id = req.params.id;
    let user = await User.findOne({ _id: id, status: 'active' });
    if (user) {
      user.password = undefined;

      return responseFormalize(200, 'GET_USER_DETAIL_SUCCESS', '', '', user);
    } else {
      return responseFormalize(200, 'GET_USER_DETAIL_FAIL', true, 'User not found');
    }

  } catch (err) {
    logger(`Get user detail ${err}`);

    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
  }
};


const createUser = async (req) => {
  const data = req.body;
  if (!data.userName || !data.password || !data.fullName || !data.address || !data.phoneNumber || !data.email ) {
    return responseFormalize(404, 'INVALID_FIELDS', false, 'Missing required fields!');
  } else {
    try {

      const user = await User.findOne({ userName: data.userName, status: 'active' });
      if (!user) {
        const user = await User.create(data);

        return responseFormalize(200, 'CREATE_NEW_USER_SUCCESS', '', '', user._id);
      }
      else { return responseFormalize(200, 'USER_EXISTED', true); }
    } catch (err) {
      logger(`Create user error ${err}`);
      readFile();

      return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
    }
  }
};

const updateUser = async (req) => {

  try {
    const id = req.params.id;
    const data = req.body;
    const user = await User.findOne({ _id: id });
    if (user) {
      const update = await user.updateOne(data);

      return responseFormalize(200, 'GET_USER_DETAIL_SUCCESS', '', '', update);
    } else {
      return responseFormalize(200, 'GET_USER_FAIL', true, 'User not found');
    }
  } catch (err) {
    logger(`Update user error ${err}`);

    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
  }

};

const removeUser = (req) => updateUser(req, { status: 'delete' });

const forgotPassword = async (req) => {
  if (!req.body.username) {
    return responseFormalize(404, 'INVALID_FIELD', false, 'username are required!');
  } else {
    try {
      const username = req.body.username;
      const user = await User.findOne({ userName: username });
      if (user) {
        const resetToken = await generateResetToken();
        await user.updateOne(resetToken);

        return responseFormalize(200, 'TOKEN_GENERATE_SUCCESS', '', '', resetToken);
      } else {
        return responseFormalize(200, 'GET_USER_FAIL', true, 'User not found');
      }
    } catch (err) {
      logger(`get token reset error ${err}`);

      return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
    }
  }
};

const resetNewPassword = async (req) => {
  if (!req.body.password) {
    return responseFormalize(404, 'INVALID_FIELD', false, 'New password are required!');
  } else {
    try {
      const id = req.params.id;
      const data = req.body;
      const user = await User.findOne({ _id: id });
      if (user) {
        const now = new Date;
        // eslint-disable-next-line eqeqeq
        if (user.resetToken == data.resetToken && user.resetTokenExpired > now) {
          await user.updateOne({ password: data.password, resetToken: null });

          return responseFormalize(200, 'RESET_PASSWORD_SUCCESS', true);
        } else {
          return responseFormalize(200, 'INVALID_TOKEN', true);
        }
      } else {
        return responseFormalize(200, 'GET_USER_FAIL', true, 'User not found');
      }
    } catch (err) {
      logger(`get reset password error ${err}`);

      return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
    }
  }
};

const searchListUser = async (req) => {
  const query = req.query;
  try {
    let page;
    let limit;
    if (!isNaN(query.page) || !isNaN(query.limit)) {
      page = Number(query.page);
      limit = Number(query.limit);
    } else {
      page = 1;
      limit = 10;
    }
    const skipRecord = (page - 1) * limit;
    // eslint-disable-next-line eqeqeq
    if (!query.search || query.search.length == 0) {
      const user = await User.find({}).limit(limit);
      if (!user) { return responseFormalize(200, 'GET_LIST_USER_FAIL', true); }
      else { return responseFormalize(200, 'GET_LIST_USER_SUCCESS', true, 'User found', user); }

    } else {

      const regex = `(${query.search})+`;
      const user = await User.find({ fullName: new RegExp(regex, 'gmi') })
        .skip(skipRecord)
        .limit(limit);
      if (!user) { return responseFormalize(200, 'GET_LIST_USER_FAIL', true); }
      else {
        return responseFormalize(200, 'GET_LIST_USER_SUCCESS', true, user);
      }
    }

  } catch (err) {
    logger(`Reset token error${err}`);

    return responseFormalize(500, 'INTERNAL_SERVER_ERROR', true, 'Internal server error');
  }
};

export { loginUser, getUserDetail, createUser, updateUser, removeUser, forgotPassword, resetNewPassword, searchListUser };

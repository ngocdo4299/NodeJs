import { loginUser, getUserDetail, createUser, updateUser, removeUser, forgotPassword, resetNewPassword, searchListUser } from './userController.js';

export const login = async (req, res) => {
  const result = await loginUser(req);
  res.status(result.status).json(result);
};

export const getDetail = async (req, res) => {
  const result = await getUserDetail(req);
  res.status(result.status).json(result);
};

export const registry = async (req, res) => {
  const result = await createUser(req);
  res.status(result.status).json(result);
};

export const updateInfor = async (req, res) => {
  const result = await updateUser(req);
  res.status(result.status).json(result);
};

export const deleteUser = async (req, res) => {
  const result = await removeUser(req);
  res.status(result.status).json(result);
};

export const getResetPassword = async (req, res) => {
  const result = await forgotPassword(req);
  res.status(result.status).json(result);
};

export const resetPassword = async (req, res) => {
  const result = await resetNewPassword(req);
  res.status(result.status).json(result);
};

export const searchUser = async (req, res) => {
  const result = await searchListUser(req);
  res.status(result.status).json(result);
};
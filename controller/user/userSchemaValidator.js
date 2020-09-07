import { Validator } from 'jsonschema';

const v = new Validator();

const createUserData = {
  'type': 'object',
  'properties': {
    'userName': {
      'type': 'string',
    },
    'password': {
      'type': 'string',
    },
    'fullName': {
      'type': 'string',
    },
    'address': {
      'type': 'string',
    },
    'phoneNumber': {
      'type': 'string',
    },
    'email': {
      'type': 'string',
    },
  },
  'required': ['userName', 'password', 'fullName', 'address', 'phoneNumber', 'email'],
};

const loginUserData = {
  'type': 'object',
  'properties': {
    'userName': {
      'type': 'string',
    },
    'password': {
      'type': 'string',
    },
  },
  'required': ['userName', 'password'],
};

const updateUserData = {
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'type': 'object',
  'properties': {
    'userName': {
      'type': 'string',
    },
    'password': {
      'type': 'string',
    },
    'fullName': {
      'type': 'string',
    },
    'address': {
      'type': 'string',
    },
    'phoneNumber': {
      'type': 'string',
    },
    'email': {
      'type': 'string',
    },
  },
};

export const checkValidCreateUser = (data) => v.validate(data, createUserData);

export const checkValidLoginUser = (data) => v.validate(data, loginUserData);

export const checkValidUpdateUser = (data) => v.validate(data, updateUserData);

import express from 'express';
import dotenv from 'dotenv';
import {verifyToken} from '../middleware/verifyToken.js'
dotenv.config();
const router = express.Router();

export {router};


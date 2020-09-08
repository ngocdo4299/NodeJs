/* eslint-disable no-console */
import fs from 'fs';
import Ajv from 'ajv';
import { responseFormalize } from '../helper/response.js';
import { logger } from '../helper/logger.js';

const readFile = (fileName) =>

  fs.readFileSync(fileName, 'utf8');

export const verifyRequest = async (req, res, next) => {
  try {
    const filePath = JSON.parse(await readFile('./validSchema.json'));
    const path = req.originalUrl.split('/');
    if( req.method === 'PUT'){
      path[3] = '';
    }
    const schemaPath = filePath[path[2]][req.method][path[3]];
    const jsonSchema = JSON.parse(await readFile(schemaPath, 'utf8'));

    var ajv = new Ajv({ removeAdditional: true });
    var validate = ajv.compile(jsonSchema);

    if (!validate(req.body) || !path) {
      res.json(responseFormalize(404, 'INVALID_INPUT', `${validate.errors[0].keyword} ${validate.schema.required}`, validate.errors[0].message));
    } else {
      if( Object.keys(req.body).length === 0){
        res.json(responseFormalize(404, 'INVALID_INPUT'));
      }else{
        next();
      }
    }
  }catch(err){
    logger(`Valid body request ${err}`);
    next();
  }

};
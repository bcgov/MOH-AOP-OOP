import Ajv from 'ajv';
import { schema } from '../models/schema';

const ajv = new Ajv({ schemaId: '$id', allErrors: true });

const validate = async app => {
  const validator = ajv.compile(schema);
  try {
    return validator;
  } catch (err) {
    console.log('Error during validation:', err);
  }
}

export default validate;

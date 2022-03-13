import { DEBUG_MODE } from '../config';
import { ValidationError } from 'Joi';
import { CoustomError } from '../services';

const errorHandler = (err, req, res, next) => {

    let statusCode = 500;
    let data = {
        message: 'internal server error',
        ...(DEBUG_MODE === 'true' && { originalError: err.message })
        
    }

    if(err instanceof ValidationError) {

         statusCode = 422;
         data = {
            message: err.message
        }
        
    }

    // cosutom err handler
    if(err instanceof CoustomError) {

        statusCode = err.status;
         data = {
            message: err.message
        }
    }

    return res.status(statusCode).json(data);

}

export default errorHandler;
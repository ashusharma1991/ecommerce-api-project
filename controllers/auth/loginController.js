import Joi from "joi";
import { User } from "../../models";
import CoustomError from "../../services/CoustomError";
import bcrypt from 'bcrypt';
import { JwtService } from '../../services';

const loginController = {

    async login(req, res, next) {

        const loginSchema = Joi.object({

            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        });

        const { error } = loginSchema.validate(req.body);

    if(error){
        return next(error);
    }

    let access_token;

    try {

        const user = await User.findOne({ email: req.body.email });

        if(!user)
        {
            return next(CoustomError.UserNotExist('wrong email and password'));
        }

        // compare the password
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) {

            return next(CoustomError.PasswordNotMatch('wrong email and password'));
        }

        // token genrate

        access_token = JwtService.sign({ _id: user._id, role: user.role });

        res.status(500).json({
            user: user.name,
            access_token:access_token
        });

        
    } catch (error) {

        return next(error);
        
    }

    }

}

export default loginController;
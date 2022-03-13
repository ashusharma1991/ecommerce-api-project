import Joi from 'Joi';
import { CoustomError, JwtService }  from '../../services';
import { User } from '../../models';
import bcrypt from 'bcrypt';

const registerController = {
 
    async register(req, res, next) {

    // validate body request paremeter
    const registerSchema = Joi.object({
        
        name: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        confirmPassword: Joi.ref('password'),

    });

    const { error } = registerSchema.validate(req.body);

    if(error){
        return next(error);
    }

    try {

        const UserExit = await User.exists({ email: req.body.email });
        if(UserExit) {
            return next(CoustomError.alreadyExist('This email already taken'));
        }
        
    } catch (error) {

            return next(error);
    }

    const { name, email, password } = req.body;

    // hasing paaword before save in database
    const hashedPassword = await bcrypt.hash(password, 10);

    // save data in database
    

    const user = new User({

        name,
        email,
        password: hashedPassword
    });

    let access_token;

    try {

        const result = await user.save();
        
        // token genrate

        access_token =  JwtService.sign({ _id: result._id, role: result.role });
        
    } catch (error) {
         
        return next(error);
    }
        //res.send({ access_token : access_token});
        res.status(500).json({
            access_token:access_token,
            message:'User is succesfully Register'
        });
    }

}

export default registerController;
import { JWT_SECERT } from '../config';
import Jwt from 'jsonwebtoken';

class JwtService {

    static sign(payload, expiry = '60s', secret = JWT_SECERT) {

        return Jwt.sign(payload, secret, { expiresIn: expiry });

    }
}

export default JwtService;
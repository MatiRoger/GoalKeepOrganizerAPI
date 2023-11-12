const jwt = require('jsonwebtoken');

const jwtValidator = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).json({ msg:'Tu token no es valido' });
    };

    const [bearer, token] = authHeader.split(" ");

    if(bearer !== "Bearer" || !token){
        return res.status(401).json({ msg:'Tu token no es valido' });
    };

    const SECRET = process.env.SECRET_KEY;

    jwt.verify(token, SECRET, () => {
        if(error){
            return res.status(401).json({ msg:'Tu token no es valido' });
        }
        next();
    });
};

module.exports = { jwtValidator }
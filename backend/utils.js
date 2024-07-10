import jwt from "jsonwebtoken";

export const generateToken = ({ _id, name, email }) => {
  return jwt.sign({ 
    _id: _id, 
    name: name, 
    email: email 
  }, process.env.JWT_PW, {
    expiresIn: "7d",
  });
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_PW, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};


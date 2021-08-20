import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provider' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch {
    return res.status(401).json({ error: 'Token invalid' });
  }
};

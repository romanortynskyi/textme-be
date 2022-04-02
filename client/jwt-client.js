const jwt = require('jsonwebtoken');

class JWTClient {
  generateAccessToken(payload) {
    const { SECRET } = process.env;

    return jwt.sign(payload, SECRET);
  }

  decodeToken(token) {
    const { SECRET } = process.env;
    
    let decoded = '';
    if (!token) return decoded;
    try {
      decoded = jwt.verify(token, SECRET);
      return decoded;
    } catch (err) {
      return decoded;
    }
  }
}

module.exports = new JWTClient();

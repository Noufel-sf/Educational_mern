const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  console.log("Auth header:", authHeader); // Debug log
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No valid auth header found"); // Debug log
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.substring(7); // Remove "Bearer " prefix
  console.log("Extracted token:", token.substring(0, 20) + "..."); // Debug log (partial token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded successfully:", decoded); // Debug log
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token verification failed:", err.message); // Debug log
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

console.log(req,"------------>Server--token")
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
      console.log("Profile Verified", decode);

      // Store the decoded user data in the request object
      req.user = decode;
      res.cookie("token", token, { httpOnly: true });

      // res.status(200).json({
      //     result: "Profile Verified",
      // });
      // Call the next middleware or route handler
      next();
    } catch (error) {
      console.error("Invalid Token:", error.message);
      // Send a JSON response for invalid tokens
      res.status(401).json({
        result: "Invalid Token",
        auth: false,
        data: error.message,
      });
    }
  } else {
    console.log("No Token Found in the request");
    // Send a JSON response for missing tokens
    res.status(401).json({
      auth: false,
      data: "No Token Found in the request",
    });
  }
};

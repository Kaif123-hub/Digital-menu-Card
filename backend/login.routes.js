const express = require("express");
const router = express.Router();
const loginPool = require("./login.db");
const { body, validationResult } = require("express-validator");

router.post(
  "/login",
  [
    body("email").notEmpty(),
    body("password").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const result = await loginPool.query(
        "SELECT id, name, email FROM users WHERE email=$1 AND pwd=$2",
        [email, password]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({
          status: 401,
          message: "Invalid email or password",
        });
      }

      res.json({
        status: 200,
        message: "Login successful",
        user: result.rows[0],
      });

    } catch (err) {
      console.error("LOGIN ERROR:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;

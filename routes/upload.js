const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
require("dotenv").config();

const router = express.Router();

// Configure AWS SDK
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "public-read", // Set to private if you need security
    key: function (req, file, cb) {
      const rowId = req.body.rowId; // Get row_id from request
      const fileName = `${rowId}/${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

// Upload endpoint
router.post("/", upload.single("image"), (req, res) => {
  res.json({ imageUrl: req.file.location }); // Return uploaded image URL
});

module.exports = router;

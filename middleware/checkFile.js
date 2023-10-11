// middleware
module.exports = async (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      // Handle the error due to file size exceeding the limit.
      return res.status(400).json({ error: "File size limit exceeded" });
    }
  } else if (err) {
    // Handle other types of errors here.
    return res.status(500).json({ error: "Something went wrong" });
  }
  next();
};

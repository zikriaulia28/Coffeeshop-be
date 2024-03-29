const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const limits = 2 * 1024 * 1024; // 2 MBx

const fileFilter = (req, file, cb) => {
  const pattern = /png|jpg|jpeg|webp/i;
  const ext = path.extname(file.originalname);
  if (!pattern.test(ext)) {
    const error = new Error("Tipe file tidak valid. Hanya file JPG, PNG, JPEG dan WEBP yang diizinkan.");
    error.status = 400; // Tambahkan kode status pada objek error
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = upload;


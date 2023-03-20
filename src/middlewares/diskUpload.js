const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // file selalu gambar
    const dest = "./public/images";
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // gambar product: images-timestamp.ekstensi
    // gambar profile: images-userId-timestamps.ekstensi
    const filename = `images-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const limits = 10 * 1024 * 1024;// 10 MB

const fileFilter = (req, file, cb) => {
  const pattern = /jpg|png|webp/i;
  const ext = path.extname(file.originalname);
  if (!pattern.test(ext)) {
    const error = new Error("Tipe file tidak valid. Hanya file JPG, PNG, dan WEBP yang diizinkan.");
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



module.exports = {
  singleUpload: (fieldName) => upload.single(fieldName),
  multiUpload: (fieldName, maxCount) => upload.array(fieldName, maxCount),
  multiFieldUpload: (fieldList) => upload.fields(fieldList),
};
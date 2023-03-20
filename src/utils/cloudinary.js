const cloudinary = require("../configs/cloudinary");
const path = require("path");
const dataUriParser = require("datauri/parser");

const uploader = async (req, prefix, id) => {
  const { file } = req;
  if (!file) {
    return { data: null };
  }
  // mendapatkan buffer dari multer
  const buffer = file.buffer;
  const ext = path.extname(file.originalname).toString();
  // buffer conversi menjadi datauri
  const parser = new dataUriParser();
  const datauri = parser.format(ext, buffer);
  const filename = `${prefix}-${file.fieldname}-${id}`;
  try {
    const result = await cloudinary.uploader.upload(datauri.content, {
      public_id: filename,
      folder: "kopi_toko",
    });
    return { data: result, msg: "OK" };
  } catch (error) {
    return { data: null, msg: "Upload Failed", error };
  }
};

module.exports = { uploader };
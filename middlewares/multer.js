const path = require("path");
const multer = require("multer");

//? OPTION avec une fonction mime pour extraire l'extension
/* const getMime = (mimetype) => {
  const regex = /^.+\//;
  return mimetype.replace(regex, ".");
}; */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

module.exports = upload.single("avatar");

//* avatar refer to <input type="file" name="avatar" />
//* pour des fichiers multiples : upload.array("avatar")
//* pour un fichier : upload.single("avatar")

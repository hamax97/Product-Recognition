var tensorflow = require('../tensorflow/tensorflow.js');

const multer = require("multer");

var upload = multer({ storage: multer.diskStorage({

    destination: "./uploaded/files",

    filename: function (req, file, cb) {
      var ext = require('path').extname(file.originalname);
      ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
      require('crypto').pseudoRandomBytes(16, function (err, raw) {
        cb(null, (err ? undefined : raw.toString('hex') ) + ext);
      });
    }
})});


module.exports = (app) => {
	app.post('/api/image', upload.single("image"), (req, res) => {
		const tempPath = req.file.path
		tensorflow.init(tempPath, res);
	});
};


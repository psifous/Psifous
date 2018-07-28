const Storage = require('@google-cloud/storage');
const Multer = require('multer');


//nama folder atau file di GCS
const BUCKET_CONFIG = "ecommercehp";


const storage = Storage({
  projectId: "ecommerce-hacktiv",
  keyFilename: 'ecommerce-hacktiv-4870e897fd7f.json'
});

const bucket = storage.bucket(BUCKET_CONFIG);

function getPublicUrl(filename) {
  //bucket config dapet dari atas udah gitu filename sesuai file yang di kasih
  return `https://storage.googleapis.com/${BUCKET_CONFIG}/${filename}`;
}

module.exports = {
  upload(req, res, next) {
    if (!req.file) return next();

    const filename = Date.now() + '.' + req.file.originalname.split('.').pop();
    const file = bucket.file(filename);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });

    stream.on('error', (err) => {
      console.log('error uploading to GCS', err);
      next(err);
    });

    stream.on('finish', () => {
      file.makePublic()
        .then(() => {
          req.file.imageURL = getPublicUrl(filename);
          next();
        });
    });
    stream.end(req.file.buffer);
  },
  multer : Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 5 * 1024 * 1024
    }
  })
};
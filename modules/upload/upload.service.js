const firebase = require('firebase-admin');
const path = require('path');
const { v4: uuid } = require('uuid');

class UploadService {
  async uploadFile({ file, directory = '' }) {
    const { createReadStream, filename: originalName } = await file;

    const bucket = firebase.storage().bucket(process.env.BUCKET_URL);

    const extension = path.extname(originalName);

    const filename = `${directory}/${uuid()}${extension}`;

    return new Promise((resolve, reject) => {
      createReadStream().pipe(
        bucket
          .file(filename)
          .createWriteStream()
          .on('finish', async () => {
            await bucket.file(filename).makePublic() 
            
            const src = `https://storage.googleapis.com/${bucket.name}/${filename}`;
            const result = {
                filename,
                src,
            };

            return resolve(result);
          })
      );
    });
  }

  async deleteFile(filename) {
    const bucket = firebase.storage().bucket(process.env.BUCKET_URI);
    await bucket.file(filename).delete();
  }
}

module.exports = new UploadService();

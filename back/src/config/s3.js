require("dotenv").config();
var Minio = require("minio");

const bucketName = process.env.S3_BUCKET_NAME;

var minioClient = new Minio.Client({
  endPoint: "s3-api.redflox.com",
  port: 80,
  useSSL: false,
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
});

const createBucket = async () => {
  return new Promise((resolve, reject) => {
    minioClient.bucketExists(bucketName, (err, exist) => {
      if (err) {
        return reject(err);
      }
      if (exist) {
        console.info(`Bucket ${bucketName} already exists`);
        resolve();
      } else {
        minioClient.makeBucket(bucketName, "us-east-1", (err) => {
          if (err) {
            return reject(err);
          }
          console.info(`Bucket ${bucketName} created successfully`);
          resolve();
        });
      }
    });
  });
};

const uploadFile = async (file, folder) => {
  return new Promise((resolve, reject) => {
    const objectName = `${folder}/${file.name}`;
    minioClient.fPutObject(
      bucketName,
      objectName,
      file.tempFilePath,
      async (err, etag) => {
        if (err) {
          console.error("Error uploading file:", err);
          return reject(err);
        }
        try {
          await setPublicReadPolicy(bucketName, objectName);
          const url = getPublicUrl(objectName);
          const result = {
            s3Id: objectName,
            s3Url: url,
          };
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

const deleteFile = async (fileName) => {
  return new Promise((resolve, reject) => {
    minioClient.removeObject(bucketName, fileName, (err) => {
      if (err) {
        return reject(err);
      }
      console.info(`File ${fileName} deleted successfully`);
      resolve();
    });
  });
};

const setPublicReadPolicy = (bucketName, objectName) => {
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucketName}/${objectName}`],
      },
    ],
  };

  return new Promise((resolve, reject) => {
    minioClient.setBucketPolicy(bucketName, JSON.stringify(policy), (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

const getPublicUrl = (objectName) => {
  const protocol = minioClient.protocol || "https"; // Default to https if undefined
  const endPoint = minioClient.host;
  const encodedObjectName = objectName
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/"); // Encode the object name properly
  return `${protocol}//${endPoint}/${bucketName}/${encodedObjectName}`;
};

module.exports = {
  minioClient,
  createBucket,
  uploadFile,
  deleteFile,
  getPublicUrl,
};

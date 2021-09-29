import aws from 'aws-sdk';

import { APP } from '../utils/constants';

const s3 = new aws.S3({
  accessKeyId: APP.DIGITAL_OCEAN_SPACES_ACCESS_KEY_ID,
  endpoint: APP.DIGITAL_OCEAN_SPACES_ENDPOINT,
  secretAccessKey: APP.DIGITAL_OCEAN_SPACES_SECRET_ACCESS_KEY
});

/**
 * Returns the URL to the object stored within the Digital Ocean Spaces
 * bucket. Uses the key to determine location.
 *
 * @param key - Key of the object that is being stored.
 */
const getImageUrl = (key: string) => {
  return `https://${APP.DIGITAL_OCEAN_SPACES_NAME}.${APP.DIGITAL_OCEAN_SPACES_ENDPOINT}/${key}`;
};

/**
 * Deletes the image from the Digital Ocean spaces bucket with the given key.
 *
 * @param key - Key of the object to delete.
 * @throws Error if there is not an object found with the given key.
 */
const deleteImage = async (key: string): Promise<void> => {
  if (!key) return;

  const options: aws.S3.DeleteObjectRequest = {
    Bucket: APP.DIGITAL_OCEAN_SPACES_NAME,
    Key: key
  };

  await s3.deleteObject(options).promise();
};

type UploadImageArgs = {
  content: Buffer;
  key: string;
  mimeType: string;
};

/**
 * Uploads an image to the Digital Ocean Spaces bucket, with the given
 * content/key. The access level should be a public-read, so that is available
 * to use in our front-end.
 *
 * @param args.content - The Buffer content (of the image) to upload.
 * @param args.key - Key to either overwrite or create to associate with content.
 * @param args.mimeType - Type of the image (ie: image/png, image/jpeg).
 */
const uploadImage = async ({ content, key, mimeType }: UploadImageArgs) => {
  const options: aws.S3.PutObjectRequest = {
    ACL: 'public-read',
    Body: content,
    Bucket: APP.DIGITAL_OCEAN_SPACES_NAME,
    ContentType: mimeType,
    Key: key
  };

  return s3.putObject(options).promise();
};

const ImageService = {
  deleteImage,
  getImageUrl,
  uploadImage
};

export default ImageService;

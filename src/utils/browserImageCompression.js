import imageCompression from 'browser-image-compression';

export const browserImageCompression = async (file) => {
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1300,
    };
    return await imageCompression(file, options);
  } catch (error) {
    console.log(error);
  }
};

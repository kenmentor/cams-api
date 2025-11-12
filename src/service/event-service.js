const { resourceDB } = require("../modules");
const { event_repository, crudRepository } = require("../repositories");
const { connectDB } = require("../utility");
const { v2: cloudinary } = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log(
  {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? "***" : null,
  } // Hide secret in log
);
require("dotenv").config();

const newcrudRepositoryExtra = new event_repository(resourceDB);
//correct
async function find_event(object) {
  return newcrudRepositoryExtra.filter(object);
}
//corect
async function update_event(id, object) {
  return newcrudRepositoryExtra.update(id, object);
}
//corect all good
async function get_details(id) {
  return newcrudRepositoryExtra.getDetail(id);
}
//correct all good
async function update_event_view(id) {
  try {
    const data = await newcrudRepositoryExtra.update(
      id,
      { $inc: { view: 1 } },
      { new: true }
    );
    return { views: data };
  } catch (err) {
    console.error("Error while updating event view:", err);
    throw err;
  }
}
// correct all good
async function upload_event(files, body) {
  await connectDB();
  console.log("UPLOAD SERVICE ");
  console.log(files);
  console.log(body);
  const uploadBufferToCloudinary = (fileBuffer, folder = "default") => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
          timeout: 600000, // 10 minutes
        },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      stream.end(fileBuffer);
    });
  };

  let thumbnailUrl = "";
  if (files.thumbnail?.length > 0) {
    const result = await uploadBufferToCloudinary(
      files.thumbnail[0].buffer,
      "thumbnails"
    );
    thumbnailUrl = result.secure_url;
  }

  body.thumbnail = thumbnailUrl;

  // body.host = Object(body.host);

  const data = await newcrudRepositoryExtra.create(body);
  await data.save();
  return data;
}

module.exports = {
  find_event,
  update_event_view,
  upload_event,
  get_details,
  update_event,
};

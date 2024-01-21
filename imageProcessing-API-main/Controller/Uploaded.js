// CRUD Operation on uploaded Imgages Handled Here
let RawImage = require("../models/Images");
let { createWorker } = require("tesseract.js");
let uploadedImage = {
  // sendImages will Send All Images on Get Request
  sendImages: async (req, res, next) => {
    let file = req.params.fileName;
    try {
      let data = await RawImage.findOne({ images: { $regex: file } });
      // console.log(data, "coming");
      res.status(200).json(data);
    } catch (err) {
      res.status(404).send("error", err);
    }
  },
  // Insert Data/Image on user Upload
  uploadImages: async (req, res, next) => {
    try {
      // // Get the uploaded file path
      // const images = `${req.protocol}://${req.get("host")}/uploads/${
      //   req.file.filename
      // }`;
      // await RawImage.create({ images: images });
      // console.log("Image Uploaded successfully");
      // res.redirect(`/${req.file.filename}`);
      const worker = await createWorker("eng");
      const ret = await worker.recognize(`${req.file.path}`);
      res.send(ret.data.text);
      await worker.terminate();
    } catch (err) {
      res.status(500).send("Error while uploading", err);
    }
    // console.log(req.file);
  },
};

module.exports = uploadedImage;

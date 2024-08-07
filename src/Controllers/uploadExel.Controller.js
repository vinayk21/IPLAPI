const asyncHandler = require("express-async-handler");
const { ApiResponce } = require("../Constants/apiResponce");
const { USEREXELMODEL } = require("../Models/userexelupload.Model");
const fs = require("fs");
const xlsx = require("xlsx");
const uploadExel = asyncHandler(async (req, res) => {
  const exlepath = req?.file?.path;
  const dataexel = xlsx.readFile(exlepath);
  const rededfileName = dataexel.SheetNames[0];
  const rededfilesheet = dataexel.Sheets[rededfileName];
  const alldata = xlsx?.utils?.sheet_to_json(rededfilesheet);

  let data = [];
  try {
    const promises = alldata.map(async (ele) => {
      const FILE_UPLOAD_DATA_ADD = await USEREXELMODEL.create(ele);
      console.log("data", FILE_UPLOAD_DATA_ADD);
      data.push(FILE_UPLOAD_DATA_ADD);
    });
    await Promise.all(promises);
    //   fs.unlinkSync(exlepath);
    return res
      .status(200)
      .json(new ApiResponce(200, data, "Excel uploaded successfully"));
  } catch (error) {
    console.error(error);
    // fs.unlinkSync(exlepath)
    return res
      .status(500)
      .json(new ApiResponce(500, null, "An error occurred during upload"));
  }
});

module.exports = { uploadExel };

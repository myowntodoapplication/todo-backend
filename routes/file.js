const Router = require('express');
const router = Router();
const db = require('../database.js');
const multer = require('multer');
const fs=require('fs');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename of uploaded files
  },
});

const upload = multer({ storage: storage });

// Route to handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  return res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});







// Route to handle file download
router.get('/download/:filename', (req, res) => {

    const { filename } = req.params;    
    console.log(filename)
    const uploadsFolder = path.join(__dirname, 'uploads'); // Assuming 'uploads' folder is in the root of the server
    const dir = `E:\\LMS\\ToDo Application\\todo-backend\\uploads`;
    console.log(dir)
    // Check if the file exists
    const filePath = path.join(dir, filename);
    console.log(filePath)
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log("error","rttor");
        return res.status(404).json({ message: 'File not found' });
      }
  

      const fileExtension = path.extname(filePath);
      let contentType = 'application/octet-stream'; // Default content type for binary data
  console.log(fileExtension)
      if (fileExtension === '.pdf') {
        contentType = 'application/pdf';
      } else if (fileExtension === '.txt') {
        contentType = 'text/plain';
        console.log("text")
      }

      console.log("da")
      // Stream the file to the client for download with appropriate content type
    const fileStream = fs.createReadStream(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', contentType); // Set the appropriate Content-Type header    
    fileStream.pipe(res);
    console.log("______________________________________")
    console.log("______________________________________")
    console.log("______________________________________")
    console.log("______________________________________")
    console.log("______________________________________")
    console.log(fileStream.pipe(res),"haha")
  });    
  });







module.exports = router;


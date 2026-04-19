const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(__dirname, '../uploads/');
    const type = req.params.type;
    
    if (type === 'pitchdeck') folder += 'pitchdecks/';
    else if (type === 'financial') folder += 'financials/';
    else if (type === 'screenshot') folder += 'screenshots/';
    else folder += 'documents/';
    
    ensureDir(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, JPEG, and PNG files are allowed'), false);
  }
};

const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
}).single('file');

module.exports = { uploadMiddleware };
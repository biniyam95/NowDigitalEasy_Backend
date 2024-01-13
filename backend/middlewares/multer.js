

import multer from 'multer'


const storage = multer.diskStorage({

  //to save img to public/image folder
  destination: function (req, file, cb) {
    cb(null, 'public/images/'); 
  },

  //to process and finalise filename
  filename: function (req, file, cb) {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(null, file.fieldname + '-' + uniqueSuffix +'-'+ file.originalname);

  },
});

export const handleUpload = multer({ storage: storage });


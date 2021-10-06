const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const multer = require('multer');
const { auth } = require("../middleware/auth");

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    // destination: 어디에 파일이 저장되어 있는지 얘기해 줌
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res)=>{
    upload(req, res, err=> {
        if(err){ // 에러처리
            return req.json({success: false, err})
        }
        // 파일 저장 위치, 파일명 클라이언트한테 전달
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })
})

module.exports = router;

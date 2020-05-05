const express = require("express");
const router = express.Router();
var multer  = require('multer');
var AWS = require('aws-sdk');

var storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '');
    }
});

var upload = multer({ storage: storage }).single('file');

const BUCKET_NAME = 'BUCKET_NAME';
const IAM_USER_KEY = 'USER_KEY';
const IAM_USER_SECRET = 'USER_SECRET_KEY';


router.get("/", (req, res) => {
    res.send('S3 Uploading Microservice');
});

router.post("/", upload, (req, res) => {
    const file = req.files;

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });

    s3bucket.createBucket(function () {
        let Bucket_Path = 'BUCKET_PATH';
        //Where you want to store your file
        var ResponseData = [];
    
        file.map((item) => {
            var params = {
                Bucket: BucketPath,
                Key: item.originalname,
                Body: item.buffer,
                ACL: 'public-read'
            };

            s3bucket.upload(params, function (err, data) {
                    if (err) {
                    res.json({ "error": true, "Message": err});
                    }else{
                        ResponseData.push(data);
                        if(ResponseData.length == file.length){
                        res.json({ "error": false, "Message": "File Uploaded    SuceesFully", Data: ResponseData});
                        }
                    }
                });
        });
    });
});
  

module.exports = router;
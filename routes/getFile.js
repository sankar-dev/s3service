const express = require("express");
const router = express.Router();
var AWS = require('aws-sdk');

const BUCKET_NAME = 'BUCKET_NAME';
const IAM_USER_KEY = 'USER_KEY';
const IAM_USER_SECRET = 'USER_SECRET_KEY';


router.get("/:key", (req, res) => {
    const filename = req.params.key;
    const s3 = new AWS.S3()
    AWS.config.update({accessKeyId: IAM_USER_KEY, secretAccessKey: IAM_USER_SECRET});

    const signedUrlExpireSeconds = 60 * 5;
    
    const url = s3.getSignedUrl('getObject', {
        Bucket: BUCKET_NAME,
        Key: filename,
        Expires: signedUrlExpireSeconds
    })

    res.send({ fileUrl: url });
});


module.exports = router;
let AWS = require('aws-sdk');
const s3 = new AWS.S3();
exports.handler = function (event, context, callback) {

    //Entered in to Lambda
    console.log("Starting the lambda");

    //Get source folder name
    var srcBucket = event.Records[0].s3.bucket.name;

    //Get source key
    var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ""));

    console.log("Source Bucket name"+srcBucket);
    console.log("Source Bucket key"+srcKey);

    //Get uploade Image type
    var typeMatch = srcKey.match(/\.([^.]*)$/);

    //No image type to determine
    if(!typeMatch){
        callback("Could not determine the image type");
        return;
    }
    console.log("Image type"+typeMatch);

    //Image type is not supported
    var imageType = typeMatch[1];
    if (imageType != "jpg"/* && imageType != "png"*/) {
        callback('Unsupported image type: ${imageType}');
        return;
    }
    
    s3.putObject({
        "Body": "data",
        "Bucket": "hiru.sampleresized",
        "Key": "samplekey"
    })
        .promise()
        .then(data => {
            console.log(data);           // successful response
            /*
            data = {
                ETag: "\\"6805f2cfc46c0f04559748bb039d69ae\\"", 
                VersionId: "pSKidl4pHBiNwukdbcPXAIs.sshFFOc0"
            }
            */
        })
        .catch(err => {
            console.log(err, err.stack); // an error occurred
        });


}
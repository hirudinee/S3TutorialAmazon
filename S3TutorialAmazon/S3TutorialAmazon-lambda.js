let AWS = require('aws-sdk');
exports.handler = function(event, context, callback){

    //Entered in to Lambda
    console.log("Starting the lambda");

    //Get source folder name
    var srcBucket = event.Records[0].s3.bucket.name;

    //Get source key
    var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g,""));

}
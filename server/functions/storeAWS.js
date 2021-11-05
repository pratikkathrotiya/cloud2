const config = require('../config');
var AWS = require("aws-sdk");

module.exports = {
    storeS3: function (accountname, user, tweets, allsentiment, monthlySentiment, topics) {
        const body = JSON.stringify({ accountname, user, tweets, allsentiment, monthlySentiment, topics });
        const objectParams = { Bucket: config.bucketName, Key: accountname, Body: body };
        const uploads3 = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
        uploads3.catch((e) => {
            console.log(e);
        })
    }
}
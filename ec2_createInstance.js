// Load the AWS SDK for Node.js

var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.update({region: 'ap-southeast-2a'});

AWS.config.apiVersions = {
    ec2: '2016-11-15',
    // other service API versions
};

// Create EC2 service object
var ec2 = new AWS.EC2();

// AMI is amzn-ami-2011.09.1.x86_64-ebs
var params = {
    ImageId: 'AMI_ID',
    InstanceType: 't1.micro',
    KeyName: 'KEY_PAIR_NAME',
    MinCount: 1,
    MaxCount: 1
};

// Create a promise on an EC2 service object
var instancePromise = new AWS.EC2().runInstances(params).promise();

// Handle promise's fulfilled/rejected states
instancePromise.then(
    function(data) {
        console.log(data);
        var instanceId = data.Instances[0].InstanceId;
        console.log("Created instance", instanceId);
        // Add tags to the instance
        var tagParams = {Resources: [instanceId], Tags: [
                {
                    Key: 'Key_name',
                    Value: 'Create sample Instance'
                }
            ]};
        // Create a promise on an EC2 service object
        var tagPromise = ec2.createTags(tagParams).promise();
        // Handle promise's fulfilled/rejected states
        tagPromise.then(
            function(data) {
                console.log("Instance tagged");
            }).catch(
            function(err) {
                console.error(err, err.stack);
            });

        var instanceExistsCheck =  ec2.waitFor('instanceExists', tagParams).promise();
        instanceExistsCheck.then(function(data){
            console.log("Instance Exists");
        }).catch(function(err){
            console.error(err, err.stack);
        });

        var instanceCleanUp = ec2.stopInstances(tagParams).promise();
        instanceCleanUp.then(function(data){
            console.log("Instance successfully stopped");
        }).catch(function(err){
            console.error(err, err.stack);
        });

    }).catch(
    function(err) {
        console.error(err, err.stack);
    });



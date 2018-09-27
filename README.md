#Running API Test
##Prerequisites
The software below must be installed in order to develop tests and execute the test

Node.js - JavaScript runtime

###Clone Repository
https://github.com/rinkoosingh/API-Test.git

###Install Node packages
cd APITest && npm install

###To Run the Test
node ec2_createInstance.js

###For CI
Bamboo can be used for CI:
    Checkout the source code from git
    create a plan with task type Node.js
    Specify the script as ec2_createInstance.js
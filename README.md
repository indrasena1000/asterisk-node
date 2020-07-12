# asterisk-node
This Package is made for Dynamically Registering Asterisk users using nodejs in most simple way.. 

## Quick Start
Install Package .Follow Instructions .Enjoy 


Install the package:
```shell
$ npm install --save asterisk-node
```
## Prerequisits before using package
=> This code will be worked only for linux users
=> If your Windows User Use virtualBox to install linux OS and Use this Package

 ### Warning :
 ```shell
Switch to root terminal beforing using our Package
Asterisk files will be accessed only in root terminal
Your Node Code should run in root terminal
```

Use the package:

```javascript
var Asterisk = require('asterisk-node');

//Important : Asterisk.Initialize need to be Executed Only Once.Please Comment it after Executing Or Else all your Registered Users will be Deleted
Asterisk.init() 
 Asterisk.reg(999999999,1234) //mobile number to be registered and password for authentication
```

var fs = require('fs');
var winston = require('winston')

/* util script to base64 encode a file */
var myArgs = process.argv.slice(2);

if (myArgs.length < 1) {
    winston.info("No filename provided");
    process.exit(1);
}

var fileData = fs.readFileSync(myArgs[0]);

// Output to console base64 encoded data
winston.info(Buffer.from(fileData).toString('base64'));

process.exit(0);
const fs = require('fs');
const https = require('https');
const axios = require('axios');
const express = require('express');
const xmlConvert = require('xml-js');
const soap = require('easy-soap-request');
const soapRequest = require('./soapRequest.js');
var packageJSON = require('../package.json');
var winston = require('winston');

const clientCert = base64Decode(process.env.MUTUAL_TLS_PEM_CERT);
const clientKey = base64Decode(process.env.MUTUAL_TLS_PEM_KEY_BASE64);

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const HOST_NAME = process.env.HOSTNAME || '?';
const USE_AUDIT_LOGS = (process.env.USE_AUDIT_LOGS == 'true');
const MAX_FILES = parseInt(process.env.MAX_FILES, 10) || 10;
const MAX_BYTE_SIZE_PER_FILE = parseInt(process.env.MAX_BYTE_SIZE_PER_FILE, 10) || (1024 * 1024 * 75)

var transport = null;

// initialize winston
winston.level = LOG_LEVEL
winston.remove(winston.transports.Console)
winston.add(winston.transports.Console, {
  'timestamp': true
})
if (process.env.WINSTON_PORT) {
  winston.add(winston.transports.Syslog, {
    host: WINSTON_HOST,
    port: WINSTON_PORT,
    protocol: 'udp4',
    localhost: HOSTNAME
  })
}

// using Express
const app = express();

// Node middleware method.  Fires before every path. Log request , etc
app.use('/', function (req, res, next) {
    next();
});

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send("OK. Version: " + packageJSON.version);
});

// health and readiness check
app.get('/hello', function (req, res) {
    res.status(200).end();
});

// Add status endpoint
app.get('/status', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.write("URL: " + soapRequest.address.url + "\n");
    // console.log("Cert:\n" + clientCert);
    console.log("Key:\n" + clientKey.slice(0, 100));
    res.write("\nCert:\n" + clientCert.slice(0, 100) + "\n");
    res.write("\nKey:\n" + clientKey.slice(0, 100) + "\n");
    res.end();
});

app.get('/ip', function (req, res) {

    res.setHeader('Content-Type', 'text/plain');
    getIp()
        .then(rep => res.send(rep.data))
        .catch(err => res.send(err.message));
});

app.get('/test', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    const url = soapRequest.address.url;
    axios_get(url)
        .then(resp => res.send(resp.data))
        .catch(err => { res.send(err.message); console.log(err.message); });
    return;
});

app.get('/address', function (req, res) {

    const address = req.query.address;
    const url = soapRequest.address.url;
    const myheaders = soapRequest.address.headers;
    const xml = soapRequest.address.request
                    .replace("{address}", address)
                    .replace("{country}", "Canada");

    const agent = new https.Agent({
        rejectUnauthorized: false,
        cert: clientCert,
        key: clientKey,
    });

    const extraOpts = {
        httpsAgent: agent
    }

    res.setHeader('Content-Type', 'application/json');

    const opts = {
        url: url, headers: myheaders,
        xml: xml,
        timeout: 5000,
        extraOpts: extraOpts
    };

    const soapOpts = {
        url: url, headers: myheaders,
        xml: xml,
        timeout: 5000,
        extraOpts: extraOpts,
        checkServerIdentity: () => { return null; },
    };

    soap(soapOpts)
        .then(data => {
            const { headers, body, statusCode } = data.response;

            //console.log(headers);
            //console.log(statusCode);
            const result = xmlConvert.xml2json(body, { compact: true, spaces: 2, alwaysChildren: false });
            const json = JSON.parse(result);

            // This is a hack.  Need to parse more elegantly
            const processResult = json['S:Envelope']['S:Body'].ProcessResponse.ProcessResult;
            const dataSet = processResult.Results.Result.ResultDataSet.ResultData;

            // If dataSet is an Array, we have multiple responses
            // console.log(dataSet.length)
            const reply = { Address: [] }
            if (dataSet.length) {
                for (let address of dataSet) {
                    reply.Address.push(formatAddressData(address.Address));
                }
            }
            else
                reply.Address.push(formatAddressData(dataSet.Address));

            res.send(reply);
        })
        .catch(err => {
            const error = { "error": err.message || err };
            winston.error(err.message);
            res.send(error);
            console.log(error);
        });
});

app.get('/address-raw', function (req, res) {

    const address = req.query.address;
    const url = soapRequest.address.url;
    const myheaders = soapRequest.address.headers;
    const xml = soapRequest.address.request
                    .replace("{address}", address)
                    .replace("{country}", "Canada");

    const agent = new https.Agent({
        rejectUnauthorized: false,
        cert: clientCert,
        key: clientKey,
    });

    const extraOpts = {
        httpsAgent: agent
    }

    res.setHeader('Content-Type', 'application/json');

    const opts = {
        url: url, headers: myheaders,
        xml: xml,
        timeout: 5000,
        extraOpts: extraOpts
    };

    const soapOpts = {
        url: url, headers: myheaders,
        xml: xml,
        timeout: 5000,
        extraOpts: extraOpts,
        checkServerIdentity: () => { return null; },
    };

    soap(soapOpts)
        .then(data => {
            const { headers, body, statusCode } = data.response;

            //console.log(headers);
            //console.log(statusCode);
            const result = xmlConvert.xml2json(body, { compact: true, spaces: 2, alwaysChildren: false });
            const json = JSON.parse(result);

            // This is a hack.  Need to parse more elegantly
            const processResult = json['S:Envelope']['S:Body'].ProcessResponse.ProcessResult;
            const dataSet = processResult.Results.Result.ResultDataSet.ResultData;

            // If dataSet is an Array, we have multiple responses
            // console.log(dataSet.length)
            const reply = { Address: [] }
            if (dataSet.length) {
                for (let address of dataSet) {
                    reply.Address.push(address.Address);
                }
            }
            else
                reply.Address.push(dataSet.Address);

            res.send(reply);
        })
        .catch(err => {
            const error = { "error": err.message || err };
            winston.error(err.message);
            res.send(error);
            console.log(error);
        });
});

app.get('/zip', function (req, res) {

    const code = req.query.code;
    const url = soapRequest.zip.url;
    const myheaders = soapRequest.zip.headers;
    const xml = soapRequest.zip.request.replace("$zipcode", code);

    res.setHeader('Content-Type', 'application/json');

    (async () => {
        try {
            const { response } = await soap({ url: url, headers: myheaders, xml: xml, timeout: 5000 });
            const { headers, body, statusCode } = response;
            // console.log(headers);
            // console.log(statusCode);
            var result = xmlConvert.xml2json(body, { compact: true, spaces: 4 });
            res.send(result);
        } catch (err) {
            var result = xmlConvert.xml2json(err, { compact: true, spaces: 4 });
            res.send(result);
        }

    })();

});

// Start express
app.listen(8080);
console.log("Listening on port 8080");
// console.log("Cert: " + clientCert.slice(0, 100));
// console.log("Key: " + clientKey.slice(0, 100));


function axios_get(url, res) {

    const agent = new https.Agent({
        rejectUnauthorized: false,
        cert: clientCert,
        key: clientKey
    });

    const options = {
        method: 'get',
        url: url,
        httpsAgent: agent,
    };

    return axios(options);
}

function base64Decode(string) {
    if (!string)
        return "empty";
    let buffer = new Buffer.from(string, 'base64');
    return buffer.toString('ascii');
}

function getIp() {
    const url = "https://api.ipify.org?format=json";
    return axios.get(url);
}

function formatAddressData(data) {
    let result = {};
    result.Organization = getTextData(data, 'Organization');
    result.Contact = getTextData(data, 'Contact');
    result.Building = getTextData(data, 'Building');
    result.SubBuilding = getTextData(data, 'SubBuilding');
    result.Street = getTextData(data, 'Street');
    result.HouseNumber = getTextData(data, 'HouseNumber');
    result.DeliveryService = getTextData(data, 'DeliveryService');
    result.Locality = getTextData(data, 'Locality');
    result.PostalCode = getTextData(data, 'PostalCode');
    result.Province = getTextData(data, 'Province');
    result.Country = getTextData(data, 'Country');
    result.Residue = getTextData(data, 'Residue');
    result.DeliveryAddressLines = getTextData(data, 'DeliveryAddressLines');
    result.AddressLines = getAddressLines(data);
    result.AddressComplete = data.AddressComplete._text.replace('\n', ' ');
    return result;
}

function getTextData(data, key) {
    if (data[key] && data[key].string && data[key].string._text) {
        return data[key].string._text;
    } else {
        return '';
    }
}

function getAddressLines(data) {
    if (!data) {
        return [];
    } else if (data.DeliveryAddressLines
               && Array.isArray(data.DeliveryAddressLines.string)) {
        const lines = [];
        for(let i=0; i<data.DeliveryAddressLines.string.length; i++) {
            lines.push(data.DeliveryAddressLines.string[i]._text);
        }
        return lines;
    } else if (data.DeliveryAddressLines
               && data.DeliveryAddressLines.string
               && data.DeliveryAddressLines.string._text) {
        return [data.DeliveryAddressLines.string._text];
    } else {
        return [];
    }
}

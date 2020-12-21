# msp-service

A NodeJS based static proxy for msp-service.

## Features:

1. Proxy to target base URL  
2. Replays body and query parameters
3. Adds HTTP Basic and Client Certificate Authentication
4. Logs to console
5. Utility to convert file like a PEM to base64 string `base64encode.js` for use in configuration

## Developer Prerequisites
* node@>=4.2.5
* npm@>=3.10.0 (note: not the default of node@4.2.5)
* GIT

## Configuration
All configuration is done via a user's shell environment variable and read in NodeJS via `process.env`

Name | Description
--- | --- 
TARGET_URL | Base URL to send HTTP request
TARGET_HEADER_HOST | Host header to send
TARGET_USERNAME_PASSWORD | For HTTP Basic the username:password
CORS_ORIGIN | Optional, if using CORS supply use domain name of the allowed origin
MUTUAL_TLS_PEM_KEY_BASE64 | A base64 encoded PEM key string
MUTUAL_TLS_PEM_KEY_PASSPHRASE | The passphrase for the above PEM key
MUTUAL_TLS_PEM_CERT | The client certificate for the above KEY in a base64 encoded PEM format
SECURE_MODE | Insecure mode allows untrusted targets.  Always `true` unless you are debugging
USE_MUTUAL_TLS | Turns on and off Mutual TLS to target.  Always `true` unless you are debugging
AUTH_TOKEN_KEY | Authentication Key used in all SSL
USE_AUTH_TOKEN | Use Auth Token in all SSL
LOGGER_HOST | Host name for the Splunk Forwarder
LOGGER_PORT | Port for the Splunk Forwarder
SPLUNK_AUTH_TOKEN | Authorization token required to use the splunk server


## Crypto Tips
_Requires OpenSSL CLI installed on workstation_

If you want to extract private key from a pfx file and write it to PEM file

```
openssl.exe pkcs12 -in publicAndprivate.pfx -nocerts -out privateKey.pem
```
If you want to extract the certificate file (the signed public key) from the pfx file
```
openssl.exe pkcs12 -in publicAndprivate.pfx -clcerts -nokeys -out publicCert.pem
```
If you want to base64encode a file, i.e., like the PEMs above:
```
cd <Root of msp-service>
node ./base64encode.js <filename> 
```

Add these to the OpenShift env vars, do NOT save any certificates to GitHub.

To ensure the target's mutual SSL/TLS is configured correctly, try this command:

```
openssl s_client -showcerts -connect <servername>:<port> -servername <servername>
```

## Production Setup
See [Deploy to OpenShift](openshift/README.md) docs.

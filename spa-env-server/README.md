
# spa-env-server

Serve environment variables of server to remote SPAs (no secrets! only public info).


## Features:

1.  Receive events on a given port from a variety of sources.
2.  Log events locally in a rotating log structure in the Gluster PV attached.
3.  Retrieve environment variable (from openshift configuration of server).
4.  Allow remote access to local logs via a simple REST lookup protected by username and password for auditing


## Developer Prerequisites

* Node.js 8 or later.

First, update npm to the latest version by running:

    sudo npm install npm -g

Then run:

    npm start server

To test:

 * curl -XPOST -H "Authorization: spaenv XXX" -H "Content-Type: application/json" -H 'SPA_ENV_NAME: SPA_ENV_MYENV' localhost:8080/env

 where XXX is the SERVICE_AUTH_TOKEN environment variable passed to the service.

To audit:

From a browser, hit localhost:8080/monitor and enter the username/password for the monitor as configured in the server.


## Configuration

All configuration is done via a user's shell environment variable and read in NodeJS via `process.env`.

These are:

| Environment Variable  | Description |
| --------------------- | ------------- |
| SERVICE_IP (string)           | IP address of where the service runs, defaults to 'localhost' | 
| SERVICE_PORT (number)         | port for the service, Default: 8080 | 
| SERVICE_USE_AUTH  (boolean)   | spa env server uses a token to authorize connection from a service | 
| SERVICE_AUTH_TOKEN   (string) | security token used by services to connect to spa env server |
| USE_AUDIT_LOGS (boolean)      | turn on the logging mechanism with remote viewing of audit logs |
| FILE_LOG_LEVEL  (string)      | log level for local log file, defaults to 'info' |
| LOG_DIR_NAME  (string)        | Directory path to store local log files - typically local PV mount point, ie. /var/logs |
| MONITOR_USERNAME  (string)    | username for the /monitor REST endpoint to view and download local logs |
| MONITOR_PASSWORD  (string)    | password for the /monitor REST endpoint to view and download local logs |
| MAX_FILES  (number)           | total number of log files to rotate over. Default: 10 |
| MAX_BYTE_SIZE_PER_FILE  (number) | total number of each log file. Default: (1024 * 1024 * 75) = 75mb |
| APPEND_POD_NAME_TO_FILE (boolean) | Whether the pod name should be appended to the local log file name |

The max storage size used will be `MAX_FILES * MAX_BYTES_PER_FILE`. Its default storage size is 750mb.

To view and download local log files created by the server, go to URL of the route of the spa env server followed by "/monitor".  For example:  https://spa-env-server-dev.pathfinder.gov.bc.ca/monitor

The username and password should match the environment variables configured.

Special case:

To support Server calculated Maintenance windows, you can provide two environmental variables for a start and end time.  Their name format should be:
| TIME_FORMAT    | default is "YYYY-MM-DD h:mm:ss A" ie. "2018-10-17 11:56:00 AM" |
| CURRENT_TIMEZONE   | default is "America/Vancouver" |
| SPA_ENV_XXX_MAINTENANCE_START  | in the TIME_FORMAT and CURRENT_TIMEZONE |
| SPA_ENV_XXX_MAINTENANCE_END    | in the TIME_FORMAT and CURRENT_TIMEZONE |
(where XXX is an application name  to support multiple applications centrally).

When you request for SPA_ENV_XXX_MAINTENANCE_FLAG, it will calculate the current Server time in UTC and see if it falls between those two values (START and END) in the specified CURRENT_TIMEZONE.  It will return true if you are in a maintenance window.

## Production Setup

See [Deploy to OpenShift](openshift/README.md) docs.


## SPA Client

An SPA client wishing to use this server will make an HTTP POST request to the host/port that the spa-env-server listens on.  Typically, the following environment values are used in the client:

| Environment Variable  | Description |
| --------------------- | ------------- |
| ENV_SERVER_HOST (string)	| name of the SPA Env Server host. In OpenShift this is spa-env-server. Can be an IP address.|
| ENV_SERVER_PORT (number)	| port for the service, Default: 8080|
| ENV_AUTH_TOKEN (string)| 	security token used by clients to connect to Server|
 	 
The client creates an http POST request.  An example of a function that posts a message string in javascript:

```

function postSPAEnvRequest (message) {

var options = {
  hostname: process.env.ENV_SERVER_HOST,
  port: process.env.ENV_SERVER_PORT,
  path: '/env',
  method: 'POST',
  headers: {
     'Content-Type': 'application/json',
     'Authorization': 'spaenv ' + process.env.ENV_AUTH_TOKEN,
     'Content-Length': Buffer.byteLength(body),
     'logsource': process.env.HOSTNAME,
     'timestamp': moment().format('DD-MMM-YYYY'),
     'program': 'name of the client application',
     'serverity': 'error',
     'SPA_ENV_NAME': 'SPA_ENV_MYENV'   <--- The important bit
   }
};

etc..

You can also send a JSON array of environment variable names and will receive in the response the array filled with the values found.  For example:

'SPA_ENV_NAME': '{ "SPA_ENV_MYENV1": "", "SPA_ENV_MYENV2": "" }'

IMPORTANT:  All the openshift variable names that are returned must start with SPA_ENV_, in order to deny access to environment variables not spefically designated.

```
 

Notice that all POSTs are made to the path "/env" of the spa-env-server.

Also notice the format of the Authorization header as required.

## Production Setup

See [Deploy to OpenShift](openshift/README.md) docs.

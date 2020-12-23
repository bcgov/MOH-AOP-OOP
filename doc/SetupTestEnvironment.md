
## Setup The Test Environment

## Global stuff, NSPs

1. make sure you are in the test project
```console
oc project ...-test
```

2. create ./openshift/templates/nsp-msp-to-maximus-test.yaml  (copy from -dev.yaml)
   change the IP of proxy to test proxy
   the apply using:
```console
oc process -f nsp-msp-to-maximus-test.yaml \
  -p NAMESPACE=$(oc project --short) | \
  oc apply -f -
```

3. apply the internal NSPs:
```console
oc process -f nsp-mspweb-to-all.yaml \
  -p NAMESPACE=$(oc project --short) | \
  oc apply -f -
```
4. allow the test project to pull from tools:
   Go to the test project (oc project a3c641-test).
```console
oc policy add-role-to-user system:image-puller system:serviceaccount:$(oc project --short):default -n a3c641-tools
```

## For each of the nodeJS apps, ie. splunk-forwarder, msp-service, captcha-service, spa-env-server
## (for example spa-env-server)

1. go to spa-env-server/openshift/templates

2. create the params-test.txt file, fill the env variables from openshift 3 env values for spa-env-server

3. create the trio of dc, service, routes using the deploy.yaml file:
```console
oc process -f openshift/templates/deploy.yaml --param-file=params-test.txt | oc apply -f -
```

## deal with the github workflows

1. go to the top level's .github directory

2. go to the workflow directory

3. check that everything in the deploy to test action is correct.

4. go to github, then actions, then try it.


## For the MSP application

1. go to the msp directory

2. go to openshift/templates

3. create the params-test.txt file, fill the env variables from openshift 3 env values for spa-env-server

4. create the config artifact in the test project by doing an oc process on config.yaml
```console
oc process -f openshift/templates/config.yaml --param-file=params-test.txt | oc apply -f -
```
5. create the trio of dc, service, routes using the deploy.yaml file:
```console
oc process -f openshift/templates/deploy.yaml --param-file=params-test.txt | oc apply -f -
```

## some checks in the new test environment (and compare with dev):

1. check the dc's
   oc get dc
   oc describe dc/spa-env-server...

   pay attention to roles, make sure they're ok.
   in cases of not working, delete the objects and recreate.

2. check the config
   use console?

3. check the nsp
   oc get nsp
   oc get nsp ... -o yaml

   pay attention to roles.
   in cases of not working, delete the objects and recreate.

4. check the external networks
   oc get ne
   oc get ns ... -o yaml

5. check secrets
   oc get secrets


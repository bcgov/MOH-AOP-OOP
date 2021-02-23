
## Setup The Test Environment

## Global stuff, NSPs

1. make sure you are in the test project
```console
oc project ...-test
```

2. Switch Apporeto to Kubernetes network policy
Make sure you're in dev:
```console
oc get nsp
```
And obtain name (such as builder-to-internet), and delete it, ie:
```console
oc delete nsp address-service-to-address-doctor msp-service-to-cloudflare msp-service-to-maximus-servers msp-service-to-splunk-forwarder msp-to-address-service msp-to-captcha-service msp-to-msp-service  msp-to-spa-env-server msp-to-splunk-forwarder splunk-forwarder-to-cloudflare splunk-forwarder-to-maximus-servers
```

Same with endpoints:
```console
oc get en
```
And obtain names, then delete, ie:
```console
oc delete en addressdoctor cloudflare maximus-servers
```

3. apply the quickstart (for tools, make sure your default oc project is tools):
cd /openshift/templates
```console
oc process -f quickstart.yaml NAMESPACE_PREFIX=a3c641 -p ENVIRONMENT=test | oc apply -f -
```

To check things out:
The oc process should have created 3 networkpolicies and 2 network security policies.  To check them:
oc get nsp
oc get networkpolicy
To look more in detail, for example:
oc describe nsp/any-to-any
oc describe networkpolicy/allow-all-internal


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


## For the AOP application

1. go to the aop directory

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


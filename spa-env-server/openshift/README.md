# Deploy to OpenShift

NOTES:

``console
oc process -f images/nsp-tools.yaml \
  -p NAMESPACE=$(oc project --short) | \
  oc create -f -
```

```console
oc process -f openshift/cicd.yaml \
  -p NAMESPACE=$(oc project --short) | \
  oc create -f -
```

```console
  oc get secrets | grep github
```
➜  spa-env-server git:(master) ✗ oc get secrets|grep github
github-cicd-dockercfg-mwxgm   kubernetes.io/dockercfg               1      88s
github-cicd-token-hzq6t       kubernetes.io/service-account-token   4      88s
github-cicd-token-z2zdm       kubernetes.io/service-account-token   4      88s


```console
oc get secret/github-cicd-token-58f84 \
  -o json | \
  jq '.data.token' | \
  tr -d "\"" | \
  base64 -d | \
  pbcopy
```

``console
oc process -f openshift/templates/build.yaml | \
  oc apply -f -
```

oc policy add-role-to-user system:image-puller system:serviceaccount:$(oc project --short):default -n 96fff4-tools

## Build 

A Template is provided in openshift/templates/spa-env-server-build.json.  Use the template in your tools project with conjunction with the openshift/templates/spa-env-server-jenkins.json for the jenkins2 pipeline template. 


## Deployment

A Template is provided in openshift/templates/spa-env-server-deploy.json.  Use the template in your dev, test and prod environments.


### Change Propagation
To promote runtime image from one environment to another, for example from *dev* to *test*, run

```
oc tag <yourprojectname-tools>/mygovbc-spa-env-server:latest <yourprojectname-test>/mygovbc-spa-env-server:latest <yourprojectname-tools>/mygovbc-spa-env-server:test
```
The above command will deploy the latest/dev runtime image to *test* env. The purpose of tagging runtime image of *test* env in both \<yourprojectname-test\>/mygovbc-spa-env-server:latest and \<yourprojectname-tools\>/mygovbc-spa-env-server:test is to use \<yourprojectname-tools\>/mygovbc-spa-env-server:test as backup such that in case the image stream \<yourprojectname-test\>/mygovbc-spa-env-server, which is used by *test* runtime pods, is deleted inadvertently, it can be recovered from \<yourprojectname-tools\>/mygovbc-spa-env-server:test.

The command can be setup as a Jenkins task to faciliate using Jenkins to orchestrate deployment of entire application, as is the case.

## Tips
To find source code commit point of a runtime instance on OpenShift, open a terminal on one of the running pods and run command `git rev-parse HEAD` in cwd.

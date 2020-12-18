// jenkins file for splunk-forwarder

def APP_NAME = 'mygovbc-captcha-service'
def APP_VERSION = 'master'
def TAG_NAMES = ['dev', 'test', 'prod']

def BUILD_CONFIG = APP_NAME 
def IMAGESTREAM_NAME = APP_NAME

node {
    stage('build') {
       echo "Building: " + BUILD_CONFIG
       sh ( script: """oc start-build ${BUILD_CONFIG} --follow""", returnStdout: true)
       IMAGE_HASH = sh (
           script: """oc get istag ${IMAGESTREAM_NAME}:latest -o template --template=\"{{.image.dockerImageReference}}\"|awk -F \":\" \'{print \$3}\'""", returnStdout: true).trim()
       echo ">> IMAGE_HASH: $IMAGE_HASH"
    }

    stage('deploy-' + TAG_NAMES[0]) {
       echo "Deploying to: " + TAG_NAMES[0]
       echo "Deploy to " + TAG_NAMES[0] + " " + IMAGESTREAM_NAME + ":" + "${IMAGE_HASH}"
       sh ( script: """oc tag ${IMAGESTREAM_NAME} + ":" + "${IMAGE_HASH}" ${IMAGESTREAM_NAME} + ":" + ${TAG_NAMES[0]}""", returnStdout: true)
    }
}

node {
  stage('deploy-' + TAG_NAMES[1]) {
    input "Deploy to " + TAG_NAMES[1] + "?"
    echo "Deploy to " + TAG_NAMES[1] + " " + IMAGESTREAM_NAME + ":" + "${IMAGE_HASH}"
    sh ( script: """oc tag ${IMAGESTREAM_NAME} + ":" + "${IMAGE_HASH}" ${IMAGESTREAM_NAME} + ":" + ${TAG_NAMES[1]}""", returnStdout: true)
  }
}

node {
  stage('deploy-' + TAG_NAMES[2]) {
    input "Deploy to " + TAG_NAMES[2] + "?"
    echo "Deploy to " + TAG_NAMES[2] + " " + IMAGESTREAM_NAME + ":" + "${IMAGE_HASH}"
    sh ( script: """oc tag ${IMAGESTREAM_NAME} + ":" + "${IMAGE_HASH}" ${IMAGESTREAM_NAME} + ":" + ${TAG_NAMES[2]}""", returnStdout: true)
  }
}




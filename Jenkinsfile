pipeline {
    agent {
        label 'jenkins-agent'
    }
    stages {
        stage('build') {
            steps {
                script {
                    echo ${BUILD_TIMESTAMP}
                    docker build -t ${BUILD_TIMESTAMP} .
                }
            }
        }
        
    }
}
pipeline {
    agent {
        label 'jenkins-agent'
    }
    stages {
        stage('build') {
            steps {
                script {
                    docker build -t ${BUILD_TIMESTAMP} .
                }
            }
        }
        
    }
}
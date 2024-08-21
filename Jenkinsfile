pipeline {
    agent {
        label 'jenkins-agent'
    }
    parameters {
        string(name: 'myInput', description: 'Some pipeline parameters')
    }
    stages {
        stage('Stage one') {
            steps {
                script {
                    echo " success "
                }
            }
        }
        
    }
}
// pipeline {
//     agent {
//         label 'jenkins-agent-docker'
//     }

//     stages {
//         stage('build') {
//             steps {
//                 container('jnlp') {
//                     sh 'docker build -t testing-image:latest .'
//                 }
//             }
//         }
        
//     }
// }

pipeline {
    agent {
        label 'jenkins-agent-docker' // Đảm bảo label này khớp với label trong Pod template
    }
    stages {
        stage('Checkout SCM') {
            steps {
                // Checkout mã nguồn từ Git
                git branch: 'main', url: 'https://github.com/NHQpin/first-pipeline-jenkins.git' 
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def imageName = "nhq/testing:${BUILD_TIMESTAMP}" 
                    echo "Building Docker image: ${imageName}"
                    sh "docker build -t ${imageName} ." 
                }
            }
        }
    }
}
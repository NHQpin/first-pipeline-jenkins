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

// pipeline {
//     agent {
//         label 'jenkins-agent-docker' // Đảm bảo label này khớp với label trong Pod template
//     }
//     stages {
//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     def imageName = "nhq/testing:${BUILD_TIMESTAMP}" 
//                     echo "Building Docker image: ${imageName}"
//                     sh "docker build -t ${imageName} ." 
//                 }
//             }
//         }
//     }
// }

pipeline {
  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: maven
            image: maven:alpine
            command:
            - cat
            tty: true
          - name: docker
            image: jenkins/jnlp-agent-docker
            command:
            - cat
            tty: true
        '''
    }
  }
  stages {
    stage('Run maven') {
      steps {
        container('maven') {
          sh 'mvn -version'
          sh ' echo Hello World > hello.txt'
          sh 'ls -last'
          sh 'apk update && apk add --no-cache docker'
        //   sh 'rc-update add docker boot'
        //   sh 'docker build -t testing-image:latest .'
        }
        container('docker') {
          sh 'ls'
          sh 'docker build -t testing-image:latest .'
        }
      }
    }
  }
}
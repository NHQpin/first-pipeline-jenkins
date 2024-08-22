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
            image: docker:latest
            command:
            - cat
            tty: true
            volumeMounts:
             - mountPath: /var/run/docker.sock
               name: docker-sock
          volumes:
          - name: docker-sock
            hostPath:
              path: /var/run/docker.sock    
        '''
    }
    stages {
        stage('Build-Jar-file') {
            steps {
                container('maven') {
                sh 'mvn package'
                }
            }
        }
        stage('build') {
            steps {
                container('docker') {
                sh 'docker build -t ss69261/testing-image:latest .'
                }
            }
        }
        
    }
}

// pipeline {
//     agent {
//         label 'jenkins-agent'
//     }
//     stages {
//         stage('Checkout SCM') {
//             steps {
//                 // Checkout mã nguồn từ Git
//                 git branch: 'main', url: 'https://github.com/NHQpin/first-pipeline-jenkins.git' 
//             }
//         }
//         stage('Build') {
//             steps {
//                 script {
//                     def imageName = "my-app:${BUILD_TIMESTAMP}" // Sử dụng biến để lưu trữ tên image
//                     echo "Building Docker image: ${imageName}"
//                     try {
//                         docker.build(imageName) 
//                     } catch (err) {
//                         echo "Lỗi khi build Docker image: ${err}"
//                         currentBuild.result = 'FAILURE' // Đánh dấu build là thất bại nếu có lỗi
//                     }
//                 }
//             }
//         }
//     } 
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
                  volumeMounts: # Mount thư mục workspace để chia sẻ file giữa các container
                  - name: workspace-volume
                    mountPath: /workspace
                - name: docker # Sử dụng image có Docker được cài đặt sẵn
                  image: docker:dind 
                  command:
                  - cat
                  tty: true
                  securityContext:
                    privileged: true # Cần thiết cho docker:dind
                  volumeMounts:
                  - name: workspace-volume
                    mountPath: /workspace
                  - name: docker-sock
                    mountPath: /var/run/docker.sock
                volumes:
                - name: workspace-volume
                  emptyDir: {}
                - name: docker-sock
                  emptyDir: {}
              '''
        }
    }
    stages {
        stage('Build and Test') { 
            steps {
                container('maven') {
                    sh 'mvn -version'
                    sh 'echo Hello World > hello.txt'
                    sh 'ls -la' // Sử dụng `ls -la` để xem tất cả các file, bao gồm cả file ẩn
                }
                container('docker') {
                    sh 'docker build -t testing-image:latest .' 
                    sh 'docker images' // Liệt kê các images Docker đã build
                }
            }
        }
    }
}
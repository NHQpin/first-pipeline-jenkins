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
              - name: kaniko # Sử dụng image có Kaniko
                image: gcr.io/kaniko-project/executor:debug
                command:
                - cat
                tty: true
                volumeMounts:
                - name: workspace-volume
                  mountPath: /workspace
              volumes:
              - name: workspace-volume
                emptyDir: {}
            '''
        }
    }
    stages {
        stage('Build and Test') { 
            steps {
                container('kaniko') { // Sử dụng container 'kaniko'
                    withCredentials([
                        usernamePassword(credentialsId: 'nhqhub', // Thay đổi ID credentials ở đây
                                        usernameVariable: 'DOCKERHUB_USERNAME',
                                        passwordVariable: 'DOCKERHUB_PASSWORD')
                    ]) { // Sử dụng 'nhqhub' làm credentialsId
                        sh 'echo ${BUILD_TIMESTAMP}'
                        sh 'ls' 
                        sh """
                        /kaniko/executor \
                            --context `pwd` \
                            --dockerfile dockerfile \
                            --destination nhqhub/test-images:test-kaniko \
                            --build-arg DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME} \
                            --build-arg DOCKERHUB_PASSWORD=${DOCKERHUB_PASSWORD} \
                            --verbosity=debug
                        """
                    }
                }
            }
        }
    }
}


                    // --username nhqhub \
                    // --password QgnfC{5;OY[LTsP>7;D7 \
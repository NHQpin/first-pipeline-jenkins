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
                containers:
                    - name: docker # Sử dụng image có Kaniko
                        image: docker:27.1.2-alpine3.20
                        command:
                        - cat
                        tty: true
                        volumeMounts:
                        - name: workspace-volume
                        mountPath: /workspace
                volumes:
                    - name: kaniko-secret
                    secret:
                        secretName: nhq-dockerhub
                        items:
                        - key: .dockerconfigjson
                        path: config.json
            '''
        }
    }
    stages {
        stage('Build and Test') { 
            steps {
                container('docker') { // Sử dụng container 'kaniko'
                    sh """
                        docker build -t test:latest .
                        """
                }
            }
        }
    }
}


                    // --username nhqhub \
                    // --password QgnfC{5;OY[LTsP>7;D7 \

// withCredentials([
//                         usernamePassword(credentialsId: 'nhqhub',
//                                         usernameVariable: 'DOCKERHUB_USERNAME',
//                                         passwordVariable: 'DOCKERHUB_PASSWORD')
//                     ]) { 
//                         sh 'echo ${BUILD_TIMESTAMP}'
//                         sh '''
//                             echo -n "$DOCKER_USERNAME:$DOCKER_PASSWORD" | base64 > encoded_credentials
//                             cat > config.json << EOF
//                             {
//                                 "auths": {
//                                     "https://index.docker.io/v1/": {
//                                         "auth": "$(cat encoded_credentials)"
//                                     }
//                                 }
//                             }
//                             EOF
//                             rm encoded_credentials
//                         '''
//                         sh 'ls' 
//                         sh """
//                             /kaniko/executor \
//                                 --context `pwd` \
//                                 --dockerfile dockerfile \
//                                 --destination nhqhub/test-images:test \
//                                 -v `pwd`/config.json:/kaniko/.docker/config.json \
//                                 --verbosity=debug
//                         """
//                         }
// apiVersion: v1
// data:
//   .dockerconfigjson: eyJhdXRocyI6eyJodHRwczovL2luZGV4LmRvY2tlci5pby92MS8iOnsidXNlcm5hbWUiOiJuaHFodWIiLCJwYXNzd29yZCI6ImRja3JfcGF0X29LSlE0WVlKUjJBaUJRdTZpSWF0VkNKTHZfVSIsImVtYWlsIjoibmhxMDgxMGpvYkBnbWFpbC5jb20iLCJhdXRoIjoiYm1oeGFIVmlPbVJqYTNKZmNHRjBYMjlMU2xFMFdWbEtVakpCYVVKUmRUWnBTV0YwVmtOS1RIWmZWUT09In19fQ==
// kind: Secret
// metadata:
//   name: reg-credentials
//   namespace: jenkins
// type: kubernetes.io/dockerconfigjson

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
        image: maven:3.8.1-jdk-8
        command:
        - sleep
        args:
        - 99d
      - name: kaniko
        image: gcr.io/kaniko-project/executor:debug
        command:
        - sleep
        args:
        - 9999999
        volumeMounts:
        - name: workspace-volume
          mountPath: /workspace
      restartPolicy: Never
      volumes:
      - name: kaniko-secret
        secret:
            secretName: reg-credentials
            items:
            - key: .dockerconfigjson
              path: config.json
            '''
        }
    }
    stages {
        stage('Build and Test') { 
            steps {
                container('kaniko') { // Sử dụng container 'kaniko'
                    sh 'echo pwd'
                    sh '''
                    /kaniko/executor --context `pwd` --dockerfile dockerfile  --destination nhqhub/test-images:new-test
                    '''
                    // sh """
                    //     /kaniko/executor \
                    //         --dockerfile=dockerfile \
                    //         --destination=nhqhub/test-images:new-test\
                    //         --skip-tls-verify \
                    //         --skip-tls-verify-pull \
                    //         --verbosity=debug
                    //     """
                }
            }
        }
    }
}


            // apiVersion: v1
            // kind: Pod
            // spec:
            //   containers:
            //   - name: kaniko # Sử dụng image có Kaniko
            //     image: gcr.io/kaniko-project/executor:debug
            //     command:
            //     - cat
            //     tty: true
            //     volumeMounts:
            //     - name: workspace-volume
            //       mountPath: /workspace
            //   volumes:
            //     - name: kaniko-secret
            //       secret:
            //         secretName: reg-credentials
            //         items:
            //         - key: .dockerconfigjson
            //           path: config.json

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
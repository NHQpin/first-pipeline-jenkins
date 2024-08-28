pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: docker 
    image: docker:dind
    command: [dockerd-entrypoint.sh]
    securityContext:
      privileged: true
    volumeMounts:
    - name: workspace-volume
      mountPath: /workspace
'''
        }
    }
    environment {
        DOCKERHUB_REPO = 'nhqhub/nhq-project'
    }
    stages {
        stage('Build Image') { 
            steps {
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-nhq', 
                    passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                        sh """
                        docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}
                        docker build -t $DOCKERHUB_REPO:${env.BUILD_TIMESTAMP} .
                        docker push $DOCKERHUB_REPO:${env.BUILD_TIMESTAMP}
                        """
                    }
                }
            }
        }
        // stage('test Image') { 
        //     steps {
        //         container('docker') {
        //             withCredentials([usernamePassword(credentialsId: 'dockerhub-nhq', 
        //             passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
        //                 sh """
        //                 docker run -d --name test-images -p 3000:3000 -p 3306:3306 $DOCKERHUB_REPO:${env.BUILD_TIMESTAMP}
        //                 docker ps
        //                 docker ps -a
        //                 docker logs test-images
        //                 docker exec test-images curl localhost:3000
        //                 """
        //             }
        //         }
        //     }
        // }
    }
}

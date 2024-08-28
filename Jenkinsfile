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
        TAG_DAYTIME = ${env.BUILD_TIMESTAMP}
    }
    stages {
        stage('Build Image') { 
            steps {
                container('docker') {   
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-nhq', 
                    passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                        sh """
                        docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}
                        docker build -t nhqhub/test-images:${TAG_DAYTIME} . 
                        docker push nhqhub/test-images:${TAG_DAYTIME}
                        """
                    }
                }
            }
        }
        stage('test Image') { 
            steps {
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-nhq', 
                    passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                        sh """
                        ls
                        docker run -d --name test -p 80:3000 -p 3306:3306 nhqhub/test-images:$(cat tag_daytime.txt)
                        docker ps
                        docker ps -a
                        """
                    }
                }
            }
        }
    }
}

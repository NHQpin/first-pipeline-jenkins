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
    stages {
        stage('Build Image') { 
            steps {
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-nhq', 
                    passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                        sh """
                        docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}
                        echo ${env.BUILD_TIMESTAMP}
                        docker build -t nhqhub/test-images:${env.BUILD_TIMESTAMP} .
                        echo ${env.BUILD_TIMESTAMP} 
                        docker push nhqhub/test-images:${env.BUILD_TIMESTAMP}
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
                        docker run -d --name test -p 80:3000 -p 3306:3306 nhqhub/test-images:new-test
                        """
                    }
                }
            }
        }
    }
}

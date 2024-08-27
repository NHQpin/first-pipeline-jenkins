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
        stage('Build and Push Image docker') { 
            steps {
                container('docker') {
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId:'nhqhub',
                    usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']
                    ]){
                        sh """
                        docker login -u $USERNAME -p $PASSWORD
                        docker build -t nhqhub/test-images:new-test . 
                        docker push nhqhub/test-images:new-test
                        """
                    }
                }
                
            }
        }
    }
}

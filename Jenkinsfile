pipeline {
    agent {
        label 'jenkins-agent'
    }
    stages {
        stage('build') {
            steps {
                script {
                    // echo ${BUILD_TIMESTAMP}
                    docker build -t ${BUILD_TIMESTAMP} .
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
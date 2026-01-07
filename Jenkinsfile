pipeline {
  agent any
  
  environment {
        IMAGE_NAME = 'test_playwright'
        TEST_RESULTS = 'test-results'
    }

  stages {
    stage('Clean workspace') {
        steps {
            cleanWs()
        }
    }
    stage('Remove Docker Image') {
        steps {
            sh '''
            docker rmi test_playwright || true
            '''
        }
    }
    stage('Clone repo') {
      steps {
        git branch: 'main', url: 'https://github.com/jirapat15083/test_ci_playwright_with_jenkins.git'
        echo "Repository cloned!"
      }
    }
    stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${IMAGE_NAME} .'
                    echo "Docker image built!"
                }
            }
        }
  }
}

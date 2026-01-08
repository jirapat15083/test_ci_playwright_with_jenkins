    pipeline {
    agent any
    environment {
            IMAGE_NAME = 'test_playwright'
            TEST_RESULTS = 'test-results'
            test_env = credentials('my_secret_key')
            DISCORD_WEBHOOK = credentials('webhook-discord')
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
                echo "test_env: $test_env"
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
                sh 'docker build -t ${IMAGE_NAME} .'
                echo "Docker image built!"
            }
        }
        // stage('Run Playwright Tests') {
        //     steps {
        //         sh '''
        //         docker run --rm \
        //             test_playwright 
        //         '''
        //     }
        // }
        stage('Run Playwright Tests') {
            steps {
                sh '''
                CONTAINER_ID=$(docker run -d test_playwright)
                docker wait $CONTAINER_ID
                docker cp $CONTAINER_ID:/app/playwright-report $WORKSPACE/playwright-report
                docker rm $CONTAINER_ID
                '''
            }
        }

        stage('Archive Playwright Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            }
        }

        stage('Publish Playwright Report') {
            steps {
               publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])
            }
        }

    }

    post {
        success {
            sh """
                curl -H "Content-Type: application/json" \
                -X POST \
                -d '{"content":"✅ Playwright tests passed! Report: ${BUILD_URL}artifact/playwright-report"}' \
                $DISCORD_WEBHOOK
            """
        }
        failure {
            sh """
                curl -H "Content-Type: application/json" \
                -X POST \
                -d '{"content":"❌ Playwright tests failed. See Jenkins logs: ${BUILD_URL}artifact/playwright-report"}' \
                $DISCORD_WEBHOOK
            """
        }
    }
    }
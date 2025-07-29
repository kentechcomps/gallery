pipeline { 
  agent any
  tools { 
    nodejs 'NodeJS'
  }
  environment {
        VERSION_NUMBER = '1.0' // Project version
        APP_NAME = 'gallery' // Application name
        SLACK_CHANNEL = '#student-3jb9658' // Slack channel for notifications
        RENDER_URL = 'https://gallery-s5j5.onrender.com/' // Render deployment URL
    }
 
  stages { 
    stage('clone repository') {
      steps { 
        git 'https://github.com/kentechcomps/gallery.git'
      }
    }
    stage('Build the project') {
      steps { 
        sh 'npm install'
      }
    }
    stage('Start Server') {
      steps {
         sh 'PORT=5050 node server.js' 
      }
    }
    stage('Test') { // Test listens to started server
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
    stage('Stop server') { // Stop server after tests
            steps {
                echo 'Stopping server...'
                sh 'pkill -f "node server.js" || true'
            }
        }

    stage('Deploy to Render') { // Deploy to Render
            steps {
                echo 'Deploying to Render...'
                echo "Deploying to ${env.RENDER_URL}..."
                echo 'Comments Table for Deploy to Render Stage:'
                echo '+----------------------------------+------------------+'
                echo '| Step                            | Performed By     |'
                echo '+----------------------------------+------------------+'
                echo "| Deploying to Render hosting     | ${env.BUILD_USER} |"
                echo "Deploying to ${env.RENDER_URL}..."
                echo '+----------------------------------+------------------+'
            }
        }

    post {
        always {
            echo 'Pipeline completed'
        }
        success {
            echo 'Sending Slack success notification...'
            slackSend(
                channel: env.SLACK_CHANNEL,
                color: 'good',
                message: "Build ${env.BUILD_NUMBER} of ${env.APP_NAME} v${env.VERSION_NUMBER} successfully deployed to ${env.RENDER_URL}"
            )
            echo 'Build succeeded'
        }
        failure {
            echo 'Sending email notification for failure...'
            emailext(
                attachLog: true,
                subject: "Build #${env.BUILD_NUMBER} Failed: ${env.APP_NAME} v${env.VERSION_NUMBER}",
                body: """
                    <p><b>Job Failure: ${env.JOB_NAME} #${env.BUILD_NUMBER}</b></p>
                    <p>Project: ${env.APP_NAME} v${env.VERSION_NUMBER}</p>
                    <p>Test execution failed. Check the test results in the attached log.</p>
                    <p>View console output: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    <p>Deployed site (if applicable): <a href="${env.RENDER_URL}">${env.RENDER_URL}</a></p>
                    <p><i>Build log is attached.</i></p>
                """,
                to: 'mutukukennedy34@gmail.com'
            )
            echo 'Build failed'
        }
    }

   
  }
}
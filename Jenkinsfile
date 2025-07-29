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


   
  }
}
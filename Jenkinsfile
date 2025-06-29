pipeline { 
  agent any
  tools { 
    nodejs 'NodeJS'
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
   
  }
}
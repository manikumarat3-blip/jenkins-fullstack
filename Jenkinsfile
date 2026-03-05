pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'
        FRONTEND_IMAGE = 'yourdockerhub/frontend'
        BACKEND_IMAGE = 'yourdockerhub/backend'
    }

    stages {

        stage('Clone Repo') {
            steps {
                git 'https://github.com/manikumarat3-blip/jenkins-fullstack.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $FRONTEND_IMAGE ./frontend'
            }
        }

        stage('Login DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $BACKEND_IMAGE'
                sh 'docker push $FRONTEND_IMAGE'
            }
        }

        stage('Deploy Containers') {
            steps {
                sh '''
                docker stop backend || true
                docker rm backend || true
                docker run -d -p 5000:5000 --name backend $BACKEND_IMAGE

                docker stop frontend || true
                docker rm frontend || true
                docker run -d -p 80:80 --name frontend $FRONTEND_IMAGE
                '''
            }
        }
    }
}

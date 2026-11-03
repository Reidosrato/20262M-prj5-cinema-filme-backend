pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install and validate') {
            steps {
                sh '''
                    set -eu
                    node --version
                    npm --version
                    npm ci
                '''
                withEnv(['DATABASE_URL=mysql://user:password@127.0.0.1:3306/cinema']) {
                    sh '''
                        set -eu
                        npx prisma validate
                        npm run prisma:generate
                    '''
                }
                sh '''
                    set -eu
                    npm run lint
                    npm run build
                '''
            }
        }

        stage('Validate Docker Compose') {
            steps {
                withEnv([
                    'DATABASE_URL=mysql://user:password@127.0.0.1:3306/cinema',
                    "IMAGE_TAG=${env.BUILD_NUMBER}"
                ]) {
                    sh 'docker compose config --quiet'
                }
            }
        }

        stage('Build Docker image') {
            steps {
                withEnv([
                    'DATABASE_URL=mysql://user:password@127.0.0.1:3306/cinema',
                    "IMAGE_TAG=${env.BUILD_NUMBER}"
                ]) {
                    sh 'docker compose build'
                }
            }
        }

        stage('Deploy main') {
            when {
                expression {
                    env.BRANCH_NAME == 'main' || env.GIT_BRANCH == 'origin/main'
                }
            }
            steps {
                withCredentials([
                    string(
                        credentialsId: 'cinema-database-url',
                        variable: 'DATABASE_URL'
                    )
                ]) {
                    withEnv(["IMAGE_TAG=${env.BUILD_NUMBER}"]) {
                        sh '''
                            set -eu
                            docker compose up -d --no-build \
                                --force-recreate \
                                --wait \
                                --wait-timeout 120
                            docker compose ps
                        '''
                    }
                }
            }
        }
    }

    post {
        failure {
            echo 'Pipeline do cinema-filme-backend falhou. Consulte os estágios acima.'
        }
        success {
            echo 'Validação e build concluídos. O deploy é executado somente na branch main.'
        }
    }
}

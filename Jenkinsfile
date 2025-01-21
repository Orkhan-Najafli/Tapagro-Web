import groovy.transform.Field

@Field // make variable global scope
Map FAILED_STAGES = [:]

def runTest(String stageName, Closure body) {
  catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
    try {
      body() // execute body i.e sh 'smth'
      FAILED_STAGES["${stageName}"] = "SUCCESS"
    } catch (e) {
      FAILED_STAGES["${stageName}"] = "FAILED"
      throw e // propagate error
    }

  }
}

pipeline {
    agent any
  
    environment {
        hosts_group_prod = 'ktn_tapagro_prod_frontend_app'
        hosts_group_staging = 'ktn_tapagro_staging_frontend_app'
        instance_path = '/var/www/html/tapagro-website-ui'
//	      instance_path_prod = '/var/www/html/tapagro'
        source = '/tmp/tapagro-website-ui.tar.gz'
        tempdest = '/temp-dir-for-frontend-pm2/${WORKSPACE}'
        playbook_prod = '/Projects/ci-cd/playbooks/deploy_front_tapagro_prod.yaml'
        playbook_staging = '/Projects/ci-cd/playbooks/deploy_front_tapagro_staging_pm2.yaml'
        inventory = '/Projects/ci-cd/inventory-files/all-inventory'
        GIT_LAST_AUTHOR = sh(script: 'git --no-pager show -s --format=\'%an\' $GIT_COMMIT', returnStdout: true).trim()
        GIT_LAST_COMMIT = sh(script: 'git log -1 --pretty=\'%B\'', returnStdout: true, encoding: 'UTF-8').trim()
    }

    stages {
        stage('Set ENV based on Branch') {
                    steps {
                        script {
                            if (env.BRANCH_NAME == 'development') {
                                hosts_group = "${hosts_group_staging}"
				            //    instance_path = "${instance_path_staging}"
                                playbook = "${playbook_staging}"
                            } else if (env.BRANCH_NAME == 'master') {
                                hosts_group = "${hosts_group_prod}"
			                //    instance_path = "${instance_path_prod}"
                                playbook = "${playbook_prod}"
                            }
                        }
                    }
                }
            
        stage('Checkout') {
             steps {
                scmSkip(deleteBuild: true, skipPattern:'.*\\[ci skip\\].*')
                script {
                    
                    // Clone the repository using SSH
                    sshagent(['github-jenkins-ssh']) {
                         checkout scm
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    runTest("Deploy") {
	                sh "tar zcvf /tmp/tapagro-website-ui.tar.gz ${WORKSPACE}/"
                    // Run Ansible playbook
                    withEnv([
                        "source=${source}",
                        "instance_path=${instance_path}",
                        "playbook=${playbook}",
                        "inventory=${inventory}",
                        "hosts_group=${hosts_group}",
                        "tempdest=${tempdest}"
                    ]) {
                        ansiblePlaybook(
                            playbook: "${playbook}",
                            inventory: "${inventory}",
                            extraVars: [
                                source: "${source}",
                                instance_path: "${instance_path}",
                                hosts_group: "${hosts_group}",
                                tempdest: "${tempdest}"
                            ],
                            extras: "--extra-vars=@/Projects/ci-cd/credentials/access_to_servers.yml"
                        )
                    }
                }
            }
        }
    }
} 
post {
            always {
                    script {
            if (env.BRANCH_NAME == 'development' || env.BRANCH_NAME == 'master') {
            // Define status icons and other notification-related variables
            def statusIcons = [SUCCESS: '\\u2705', FAILED: '\\u274c']
            
            // Initialize email body with repository/branch, last commit, and author displayed once
            def emailBody = "*Status of Job*\n\n" +
                            "Repository/branch: ${env.JOB_NAME}\n" +
                            "Last commit: ```${env.GIT_LAST_COMMIT}```\n" +
                            "Author: *${env.GIT_LAST_AUTHOR}*\n\n"
            
            // Loop through FAILED_STAGES to append only stage results with appropriate icons
            FAILED_STAGES.each { stageName, stageStatus ->
                def stageIcon = statusIcons[stageStatus] ?: '\\u1F648'
                emailBody += "Stage: ${stageName}\n" +
                             "Status: ${stageStatus} ${stageIcon}\n\n"
            }
            
            // Send the notification
            googlechatnotification url: 'id:tapagro-deployment',
                message: emailBody
            
            // Check if any stage failed and explicitly set the build result to 'FAILURE'
            if (FAILED_STAGES.find { it.value == 'FAILED' }) {
                currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
}

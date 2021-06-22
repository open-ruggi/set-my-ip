import { ListModel } from '../../../controller/Model/Type/list'
import { QuestionModel } from '../../../controller/Model/questions.model'
import { PromptController } from '../../../controller/prompt.controller'
import { Answers } from 'inquirer'
import { PluginInterface } from '../../interface/plugin.interface'
import { Region } from '../Repository/region.repository'
import { Ec2Repository } from "../Repository/ec2.repository"
import { ec2Service } from './ec2.service'
export class AwsController implements PluginInterface {
  name: string
  exec: any

  constructor(prompt: PromptController) {
    this.name = 'Aws'
    this.exec = this.main(prompt)
  }

  async main(prompt: PromptController) {
    const listQuestion: QuestionModel = new ListModel("region", "Chosse the region", Object.values(Region))
    const regionAnswer: Answers = await prompt.showQuestion(listQuestion)
    const region = regionAnswer["region"]

    const ec2 = new ec2Service(region)
  //==================================================================================================================================
    const objInstance = await ec2.instances()
    const instanceAnswer: Answers = await prompt.showQuestion(objInstance.listInstance)
    const instance = objInstance.instances[instanceAnswer["instance"]]
  //==================================================================================================================================
    const objSecurityGroups = ec2.securityGroups(instance)
    const securityGroupAnswer: Answers = await prompt.showQuestion( objSecurityGroups.listSecurityGroup)
    const securityGroup = objSecurityGroups.securityGroups[securityGroupAnswer["securityGroups"]]
  //==================================================================================================================================  
    const objRules = await ec2.rules(securityGroup)
    const rulesAnswer: Answers = await prompt.showQuestion(objRules.listRules)
    const updateRule = objRules.rules[rulesAnswer["rules"]]
  //==================================================================================================================================  
    await ec2.updateRule(securityGroup,updateRule)
  }

}



import { ListModel } from "../../../controller/Model/Type/list"
import { QuestionModel } from "../../../controller/Model/questions.model"
import { Region } from "../Repository/region.repository"
import { Ec2Repository } from "../Repository/ec2.repository"


import { Instance, GroupIdentifier, IpRange } from "@aws-sdk/client-ec2";

export class ec2Service {

    ec2: Ec2Repository

    constructor(region: string) {
        this.ec2 = new Ec2Repository(region)
    }

    async instances() {
        await this.ec2.init()
        const instances = await this.ec2.listInstance()
        const listInstance: QuestionModel = new ListModel("instance", "Chosse the instance", Object.keys(instances))
        return {
            listInstance: listInstance,
            instances: instances
        }
    }
    securityGroups(instance: Instance) {
        const securityGroups = this.ec2.listSecurityGroup(instance)
        const listSecurityGroup: QuestionModel = new ListModel("securityGroups", "Chosse the securityGroup", Object.keys(securityGroups))
        return {
            listSecurityGroup: listSecurityGroup,
            securityGroups: securityGroups
        }
    }
    async rules(securityGroup: GroupIdentifier) {
        const rules = await this.ec2.describeSecurityGroup(securityGroup)
        console.log(rules)
        const listRules: QuestionModel = new ListModel("rules", "Choose the option (port 22)", Object.keys(rules))
        return {
            listRules: listRules,
            rules: rules
        }
    }
    async updateRule(securityGroup: GroupIdentifier, ipRange: IpRange) {
        await this.ec2.revokeSecurityGroupIngress(securityGroup, ipRange)
        try {
            await this.ec2.authorizeSecurityGroupIngress(securityGroup, ipRange)
        } catch (error) {
            console.log(error)
        }
    }
}
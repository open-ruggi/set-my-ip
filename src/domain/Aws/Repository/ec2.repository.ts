import * as AWS from "@aws-sdk/client-ec2";
import { fromIni } from "@aws-sdk/credential-provider-ini";

import { miPublicIp } from "../../../util/network"

export class Ec2Repository {

    region: string
    ec2: AWS.EC2
    instances: Array<AWS.Instance>

    constructor(region: string) {
        this.region = region
        this.ec2 = new AWS.EC2({ region: this.region })
        this.instances = []
    }

    async init() {
        const params = {
            Filters: [
                {
                    Name: "tag-key",
                    Values: [
                        "Name"
                    ]
                }
            ]
        };
        const data = await this.ec2.describeInstances(params)
        const reservations = data.Reservations
        reservations.forEach(r => {
            r.Instances.forEach(i => {
                this.instances.push(i)
            })
        })
    }

    listSecurityGroup(idInstance: AWS.Instance) {
        const listSecurityGroup: any = {}
        idInstance.SecurityGroups.forEach(sg => {
            listSecurityGroup[sg.GroupName] = sg
        })
        return listSecurityGroup
    }

    async listInstance() {
        const listInstance: any = {}
        this.instances.forEach(i => {
            let instanceName: string = i.Tags.find(o => o.Key === 'Name').Value;
            listInstance[instanceName] = i
        })
        return listInstance
    }

    async describeSecurityGroup(securityGroup: AWS.GroupIdentifier) {
        let params = {
            GroupIds: [
                securityGroup.GroupId
            ]
        };
        let listRule: any = {}
        const describeSecurityGroup = await this.ec2.describeSecurityGroups(params)
        describeSecurityGroup.SecurityGroups.forEach(sgType => {
            sgType.IpPermissions.find(o => o.FromPort === 22).IpRanges.forEach(ip => {
                listRule[`${ip.CidrIp}-${ip.Description}`] = ip
            })
        })
        return listRule
    }

    async revokeSecurityGroupIngress(securityGroup: AWS.GroupIdentifier, ipRange: AWS.IpRange) {
        let params = {
            CidrIp: ipRange.CidrIp,
            GroupId: securityGroup.GroupId,
            GroupName: securityGroup.GroupName,
            FromPort: 22,
            ToPort: 22,
            IpProtocol: 'tcp'
        };
        await this.ec2.revokeSecurityGroupIngress(params)
    }
    async authorizeSecurityGroupIngress(securityGroup: AWS.GroupIdentifier, ipRange: AWS.IpRange) {
        const myIp = await miPublicIp()



        let params = {
            GroupId: securityGroup.GroupId,
            IpPermissions: [
                {
                    FromPort: 22,
                    IpProtocol: "tcp",
                    IpRanges: [
                        {
                            CidrIp: `${myIp}/32`,
                            Description: ipRange.Description
                        }
                    ],
                    ToPort: 22
                }
            ]
        };
        const data = await this.ec2.authorizeSecurityGroupIngress(params)
        console.log(data)
    }


}
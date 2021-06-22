import { Answers } from 'inquirer'
import { QuestionModel } from './controller/Model/questions.model'
import { ListModel } from './controller/Model/Type/list'
import { PromptController } from './controller/prompt.controller'
import { flowController } from './controller/flow.controller'
import { AwsController } from './domain/Aws/Service/aws.service'
enum Options {
    Aws = "Aws",
    Azure = "Azure",
    Alibaba = "Alibaba",
    Huawei = "Huawei",
    DigitalOcean = "DigitalOcean",
    Ibm = "Ibm",
    Quit = "Quit"
}

export const main = async () => {
    console.clear()
    let prompt = new PromptController()

    const listQuestion: QuestionModel = new ListModel("command", "Choose the cloud", Object.values(Options))

    const answer: Answers = await prompt.showQuestion(listQuestion)

    const flow = new flowController()

    //register all the plugins
    flow.register(new AwsController(prompt))

    try {
        await flow.exec(answer["command"])
    } catch (error) {
        console.log(error)
    }

}


main()

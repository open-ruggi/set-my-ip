import { PromptModule,createPromptModule} from 'inquirer'
import {QuestionModel} from "./Model/questions.model"

export class PromptController {
    prompt : PromptModule 

    constructor( ){
        this.prompt = createPromptModule() ;
    }

    async showQuestion(questions:QuestionModel){
        return this.prompt([questions])
    }
    
    val(){
        console.log("hola prompt")
    }
}

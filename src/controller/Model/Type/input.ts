import {QuestionModel} from '../questions.model'

class InputModel extends QuestionModel{

    constructor(name: string, message: string) {
        super(name,'input',message);
    }
    
}
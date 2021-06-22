import {QuestionModel} from '../questions.model'

class NumberModel extends QuestionModel{

    constructor(name: string, message: string) {
        super(name,'number',message);
    }

}
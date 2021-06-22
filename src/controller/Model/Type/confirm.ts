import {QuestionModel} from '../questions.model'

export class ConfirmModel extends QuestionModel{

    constructor(name: string, message: string) {
        super(name,'confirm',message);
    }

}
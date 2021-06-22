import { QuestionModel } from '../questions.model'

class CheckBoxModel extends QuestionModel {
    private choices: Array<string>

    constructor(name: string, message: string, choices: Array<string>) {
        super(name, 'checkbox', message);
        this.choices = choices
    }

    value() {
        let obj:any = {...super.value()}
        obj.choices = this.choices
        return obj
    }
}
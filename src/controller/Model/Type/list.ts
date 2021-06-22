import {QuestionModel} from '../questions.model'

export class ListModel extends QuestionModel{
    private choices : Array<string>

    constructor(name: string, message: string,choices:Array<string>) {
        super(name,'list',message);
        this.choices = choices
    }
    
    value() {
        let obj:any = {...super.value()}
        obj.choices = this.choices
        return obj
    }
}
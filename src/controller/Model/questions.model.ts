export class QuestionModel {
    private name: string;
    private type: string;
    private message: string;

    constructor(name: string, type: string, message: string) {
        this.name = name;
        this.type = type;
        this.message = message;
    }
    
    value(){
        return {
            name: this.name,
            type: this.type,
            message:this.message 
        }
    }

}
import { PluginInterface } from "../../interface/plugin.interface"
import { PromptController } from '../../../controller/prompt.controller'

export class AzureService implements PluginInterface{
    name:string
    exec:any

    constructor(prompt: PromptController) {
      this.name = 'Azure'
      this.exec = this.main
      prompt.val()
    }
    
    main(){
      console.log("hola Azure")
    }
}

import { PluginInterface } from "../domain/interface/plugin.interface";

export class flowController {
    plugins: any

    constructor() {
        this.plugins = {}
        
    }
    register(plugin: PluginInterface) {
        const { name , exec } = plugin;
        this.plugins[name] = exec;
    }
    async exec(provider:string){
        const func = this.plugins[provider];
        await func
    }
}

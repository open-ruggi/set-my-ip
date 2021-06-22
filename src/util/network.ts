import {v4} from 'public-ip'

export const miPublicIp = async()=>{
    return await v4()
}

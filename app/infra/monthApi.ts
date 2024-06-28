import { Expanse } from "./expanseApi";
import { Fixed } from "./fixedApi";
import ConfigUrl from "./configaApi";

export interface BasicMonth {
    id: string;
    name: string;
}

export type Month = {
    id: string;
    name: string;
    initial_value: number;
    current_value: number;
    expenses: Expanse[];
}


class MonthApi{
    url: string;

    constructor(){
        this.url = `${ConfigUrl.getInstance().url}/month`;
    }

    getMonths(): Promise<Month>{
    return new Promise(async(resolve, reject)=>{
        const response = await fetch(`${this.url}?type=all`)
        const response_json = await response.json();
        if(response.status !== 200) return reject(response_json);
        return resolve(response_json);
    });
    }
    
    getLasted(): Promise<Month>{
        return new Promise(async(resolve, reject)=>{
            const response = await fetch(`${this.url}?type=last`)
            const response_json = await response.json();
            if(response.status !== 200) return reject(response_json);
            console.log(response_json)
            resolve(response_json);
        })
    }
    getMonth(pk: number): Promise<Month>{
        return new Promise(async(resolve, reject)=>{
            const response = await fetch(`${this.url}?type=last&pk=${pk}`)
            const response_json = await response.json();
            if(response.status !== 200) return reject(response_json);
            resolve(response_json);
        })
    }
}

export default MonthApi;
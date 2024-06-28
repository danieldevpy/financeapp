import { Category } from "./categoryApi";
import ConfigUrl from "./configaApi";

export interface Expanse{
    id: string;
    desc: string;
    value: number;
    fixed: boolean;
    category: Category;
    date: string;
}

class ExpanseApi{
    url: string;

    constructor(){
        this.url = `${ConfigUrl.getInstance().url}/expanse`;
    }

    createExpanse(desc: string, value: number, month_id: number, id_category?: number): Promise<Expanse>{
        return new Promise(async(resolve, reject)=>{
            const response = await fetch(this.url,{
                method: "POST",
                body: JSON.stringify({
                    desc: desc,
                    value: value,
                    month: month_id,
                    category: id_category
                })
            })
            const response_json = await response.json();
            if(response.status !== 200) return reject(response_json);
            return resolve(response_json);
        })
    }

    updateExpanse(id: number, desc: string, value: number, id_category?: number): Promise<Expanse>{
       return new Promise(async(resolve, reject)=>{
        const response = await fetch(this.url,{
            method: "PUT",
            body: JSON.stringify({
                id: id,
                desc: desc,
                value: value,
                category: id_category
            })
        })
        const response_json = await response.json();
        if(response.status !== 200) return reject(response_json);
        return resolve(response_json);
       })
    }

    deleteExpanse(id: number): Promise<number>{
        return new Promise(async(resolve, reject)=>{
            const response = await fetch(this.url,{
                method: "DELETE",
                body: JSON.stringify({
                    id: id,
                })
            })
            if(response.status !== 200) return reject(response.status);
            return resolve(response.status);
        })
    }
}

export default ExpanseApi;
import ConfigUrl from "./configaApi";


export interface Category {
    id: string;
    name: string;
}

class CategoryApi{
    url: string;

    constructor(){
        this.url = `${ConfigUrl.getInstance().url}/category`;
    }

    getCategories(): Promise<Category[]>{
        return new Promise(async(resolve, reject)=>{
            const response = await fetch(`${this.url}/get_all`,{
                method: "POST",
            });
            const response_json = await response.json();
            if(response.status !== 200) return reject(response_json);
            return resolve(response_json);
        });
        }
}

export default CategoryApi;
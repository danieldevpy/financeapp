import { Category } from "./categoryApi";
import ConfigUrl from "./configaApi";

export interface Fixed {
    id: string;
    name: string;
    category: Category;
    value: number;
    active: boolean;
}

class FixedApi{
    url: string;

    constructor(){
        this.url = `${ConfigUrl.getInstance().url}/fixed`;
    }

    getFixeds(){
        return fetch(`${this.url}/get_all`,{
            method: "POST",
        })
    }
}

export default FixedApi;
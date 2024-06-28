import React from "react";
import ListSimpleComponent, {ItemProps} from "@/components/listSimpe";
import MonthApi from "../infra/monthApi";
import { useNavigation } from '@react-navigation/native';


export default function DatasPage(){
    const navigation = useNavigation();

    const items: ItemProps[] = [
        {id: '1', title: 'Meses', onclick: ()=>{}},
        {id: '2', title: "Categorias", onclick: ()=>{}},
        {id: '3', title: "Gastos Fixos", onclick: ()=>{}}
    ]

    return(
        <ListSimpleComponent data={items}/>
    )
}
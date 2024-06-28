import React from "react";
import ListSimpleComponent, {ItemProps} from "@/components/listSimpe";
import MonthApi from "../infra/monthApi";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./_layout";
import { StackNavigationProp } from '@react-navigation/stack';

export default function DatasPage(){
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const items: ItemProps[] = [
         
        {id: '1', title: 'Mesess', onclick: ()=>{navigation.navigate('data_month')}},
        {id: '2', title: "Categorias", onclick: ()=>{}},
        {id: '3', title: "Gastos Fixos", onclick: ()=>{}}
    ]

    return(
        <ListSimpleComponent data={items}/>
    )
}
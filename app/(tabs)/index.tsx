import React from "react"
import { View, StyleSheet} from 'react-native';
import { ActivityIndicator, MD2Colors, List } from 'react-native-paper';
import ListExpenseComponent from "@/components/expanse/listExpanse";
import InfoMonthComponent from "@/components/month/cardInfoMonth";
import ListFixedComponent from "@/components/fixed/listFixed";
import { ThemeApp } from "@/assets/style/theme";
import MonthApi, { Month } from "../infra/monthApi";

export default function HomePage(){
    const monthApi = new MonthApi();
    const [selectMonth, setSelectMonth] = React.useState<Month>();
    const [load, setLoad] = React.useState(false);


    React.useEffect(()=>{
        setLoad(false);
        monthApi.getLasted()
        .then(month=>setSelectMonth(month))
        .catch(error=>console.log(error))
        .finally(()=>setLoad(true));

    }, [])

    return(
        <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerTop}>
                {load?(
                <InfoMonthComponent
                    month={selectMonth}/>):(
                <ActivityIndicator
                    animating={true}
                    color={MD2Colors.red800} />
                )}
            </View>
        </View>
        <View style={styles.main}>
            {load?(
            <List.AccordionGroup>
                <List.Accordion 
                    id="1"
                    title="Gastos Fixos">
                    <ListExpenseComponent
                        showFixed
                        month={selectMonth}
                        showOptions
                        updateMonth={setSelectMonth}/>
                </List.Accordion>
                <List.Accordion 
                    id="2"
                    title="Outros Gastos">
                    <ListExpenseComponent
                        showFixed={false}
                        month={selectMonth}
                        updateMonth={setSelectMonth}
                        showAdd
                        showOptions/>
                </List.Accordion>
            </List.AccordionGroup>):(
            <ActivityIndicator
                animating={true}
                color={MD2Colors.red800}/>
            )}
        </View>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    header:{
        flex: 1
    },
    headerTop:{
        marginBottom: 10
    },

    main:{
        flex: 2
    },
    textNameMonth:{
        fontWeight: "800"
    },
    textValueInitial:{
        color: "red"
    },
    itemList:{

    },
    itemListSub:{
        display: "flex",
        flexDirection: "row",
        gap: 2
    },
    subText:{
        fontSize: 12,
        color: "grey"
    },
    background:{
        backgroundColor: ThemeApp.primaryColor
    }

})
import React from "react";
import MonthApi, {Month} from "../infra/monthApi";
import ListExpenseComponent from "@/components/expanse/listExpanse";
import { ScrollView, RefreshControl, Text, View } from "react-native";
import { List } from "react-native-paper";

interface MonthProps{

}

export default function DataMonthPage(){
    const [months, setMonths] = React.useState<Month[]>();
    const [refreshing, setRefreshing] = React.useState(false);

    const getMonths =()=>{
        new MonthApi().getMonths()
        .then(_months=> setMonths(_months))
    }

    React.useEffect(()=>{
        getMonths();
    }, [])

    return (
        <ScrollView 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={undefined} />}
            style={{maxHeight: 250, backgroundColor: "red", flex:1}}>
            
            {months?.length ? (
            <>
                {months.forEach((month, index)=>(
                    <List.Item
                    style={{ backgroundColor: index % 2 === 0 ? "white" : "#FAFAFA" }}
                    key={index}
                    left={props => <List.Icon {...props} icon="wallet" />}
                    // right={() => props.showOptions?<IconButton icon="dots-vertical" onPress={() => { setMode({ mode: "options" }, expanse) }} />:undefined}
                    title={<Text>{month.name}</Text>}
                    description={
                        <View >
                            <Text>Valor Inicial</Text>
                            <Text>{`R$${month.initial_value}`}</Text>
                        </View>
                    }
                />
                ))}
            </>
            ) : (
                <List.Item
                    style={{ backgroundColor: "white" }}
                    title="Nenhum Gasto"
                />
            )}
          
        </ScrollView>
    );
}
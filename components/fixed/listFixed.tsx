import React from "react";
import { ScrollView, RefreshControl, Text, View, StyleSheet } from "react-native"
import { Month } from "@/app/infra/monthApi";
import { List, IconButton } from "react-native-paper";
import { ThemeApp } from "@/assets/style/theme";

interface ExpanseProps{
    month?: Month;
    updateMonth: (month: Month|undefined)=>void;
    disableOptions?: boolean;
}

export default function ListFixedComponent(props: ExpanseProps){
    const [refreshing, setRefreshing] = React.useState(false);

    return(
        <>
        <ScrollView 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{}} />}
            style={{maxHeight: 250}}>
            
            {props.month?.fixeds.length?(<>
                {props.month.fixeds.map((fixed, index)=>(
                    <List.Item
                        style={{backgroundColor: index%2===0? "white":"#FAFAFA",}}
                        key={index}
                        left={props => <List.Icon {...props} icon="wallet" />}
                        right={(propss) => props.disableOptions? undefined: <IconButton {...propss} icon="dots-vertical"  onPress={()=>{}} />}
                        title={<Text style={styles.textNameMonth}>{fixed.name}</Text>}
                        description={
                            <View style={styles.itemListSub}>
                                <Text style={styles.subText}>Valor</Text>
                                <Text style={styles.subText}>{`R$${fixed.value} ${fixed.category? `(${fixed.category.name})`:''}`}</Text>
                            </View>
                        }
            />
            ))}
            </>):(
                <List.Item 
                    style={{backgroundColor: "white"}}
                    title="Nenhum Gasto"/>
            )}
          
        </ScrollView>
    </>
    )
}

const styles = StyleSheet.create({
    itemListSub:{
        display: "flex",
        flexDirection: "row",
        gap: 2
    },
    subText:{
        fontSize: 12,
        color: "grey"
    },textNameMonth:{
        fontWeight: "800"
    },
})

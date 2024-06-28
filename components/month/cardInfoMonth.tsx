import { Month } from "@/app/infra/monthApi";
import { List, Avatar, IconButton, Card } from "react-native-paper";
import { Text, StyleSheet } from "react-native";
import { ThemeApp } from "@/assets/style/theme";

interface InfoProps{
    month?: Month;
}


export default function InfoMonthComponent(props: InfoProps){

    return(
    <Card style={{backgroundColor: "white"}}>
        <Card.Title
            title={<>
                <Text>Mês selecionado </Text>
                <Text style={styles.textNameMonth}>{props.month?.name}</Text>
            </>}
            subtitle={`Gastos Registrados ${props.month?.expenses.length}`}
            left={(props) => <Avatar.Icon {...props} icon="calendar" style={styles.background}/>}
            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        />
            <Card.Content>
                <List.Section>
                    <List.Item 
                        title={
                        <>
                        <Text>Valor Inicial </Text>
                        <Text style={styles.textNameMonth}>{`R$${props.month?.initial_value}`}</Text>
                        </>
                        }left={() => <List.Icon color="green" icon="wallet" />} />
                    <List.Item
                        title={
                            <>
                            <Text>Valor Atual </Text>
                            <Text style={styles.textNameMonth}>{`R$${props.month?.current_value}`}</Text>
                            </>
                        }
                        left={() => <List.Icon color={ThemeApp.primaryColor} icon="wallet" />}
                    />
                </List.Section>
            </Card.Content>
        </Card>
    )

}


const styles = StyleSheet.create({
    textNameMonth:{
        fontWeight: "800"
    },
    background:{
        backgroundColor: ThemeApp.primaryColor
    }
})
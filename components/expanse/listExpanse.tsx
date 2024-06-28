import React from "react";
import { View, StyleSheet, ScrollView, RefreshControl, Text } from "react-native";
import {Picker} from '@react-native-picker/picker';
import CategoryApi, {Category} from "@/app/infra/categoryApi";
import ModalComponent, {ModalFunctions} from "@/components/modal";
import MonthApi, {Month} from "@/app/infra/monthApi";
import ExpanseApi, {Expanse} from "@/app/infra/expanseApi";
import { List, Avatar, IconButton,TextInput, Button, Card } from "react-native-paper";
import { ThemeApp } from "@/assets/style/theme";


interface ExpanseProps{
    showFixed: boolean;
    month?: Month;
    updateMonth: (month: Month|undefined)=>void;
    showAdd?: boolean;
    showOptions?: boolean;
}

interface ModeType{
    mode: "create"|"options"
}

const ListExpenseComponent = React.forwardRef<null, ExpanseProps>((props, ref) => {
    const expanseApi = new ExpanseApi();
    const modalRef = React.useRef<ModalFunctions>(null);
    const [categories, setCategories] = React.useState<Category[]>()
    const [modeType, setModeType] = React.useState<ModeType>();
    const [desc, setDesc] = React.useState("");
    const [value, setValue] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null);
    const [expenseUpdate, setUpdateExpense] = React.useState<Expanse>();
    const [refreshing, setRefreshing] = React.useState(false);


    const createExpanse=()=>{
        try{
            if(!desc) throw "Escreva uma descrição";
            if(!value) throw "Escreva um valor";
            if(!props.month) throw "X";
            const copy_month = props.month;
            modalRef.current?.hideModal();
            expanseApi.createExpanse(desc, Number(value), Number(copy_month.id), selectedCategory??undefined)
            .then(expanse=>{
                copy_month.expenses.push(expanse);
                copy_month.current_value -= Number(value);
                props.updateMonth(undefined);
                props.updateMonth(copy_month);
            })
            .catch(error=>console.log(error));
        }
        catch(e){console.log(e)}
    }

    const updateExpanse=()=>{
        try{
            if(!desc) throw "Escreva uma descrição";
            if(!value) throw "Escreva um valor";
            if(!expenseUpdate) throw "";
            if(!props.month) throw "";
            modalRef.current?.hideModal();
            const expanse_id = expenseUpdate.id;
            const index = props.month?.expenses.findIndex(exp=> exp.id == expanse_id);
            const copy_month = props.month;
            expanseApi.updateExpanse(Number(expanse_id), desc, Number(value), selectedCategory??undefined)
            .then(expanse=> copy_month.expenses[index] = expanse)
            .finally(()=>{
                props.updateMonth(undefined);
                props.updateMonth(copy_month);
            })
        }catch(e){console.log(e)}
    };

    const deleteExpanse =()=>{
        if(!expenseUpdate) throw "";
        modalRef.current?.hideModal();
        expanseApi.deleteExpanse(Number(expenseUpdate.id));
        reloadMonth();
    }

    const reloadMonth =()=>{
        if(!props.month) return;
        new MonthApi().getMonth(Number(props.month.id))
        .then(month=>{
            props.updateMonth(undefined);
            props.updateMonth(month);
        })
     
    }

    const setMode=(modeT: ModeType, expanse?: Expanse)=>{
        modalRef.current?.showModal();
        switch(modeT.mode){
            case "create":
                setDesc("");
                setValue("");
                setSelectedCategory(null);
                setModeType({mode: "create"})
                return
            case "options":
                if(!expanse) return;
                setDesc(expanse.desc);
                setValue(String(expanse.value));
                setSelectedCategory(Number(expanse.category?.id) ?? null)
                setModeType({mode: "options"})
                setUpdateExpense(expanse);
                return
        }
    }

    const getCategories=()=>{
        const categoryApi = new CategoryApi()
        categoryApi.getCategories()
        .then(categories=>setCategories(categories));
    }

    React.useEffect(()=>{
        if(!categories){
            getCategories();
        }
    }, [])

    return(
        <>
        <ScrollView 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={reloadMonth} />}
            style={{maxHeight: 250}}>
            
            {props.month?.expenses.length ? (
            <>
                {props.month.expenses
                    .filter(expanse => expanse.fixed === props.showFixed)
                    .map((expanse, index) => (
                        <List.Item
                            style={{ backgroundColor: index % 2 === 0 ? "white" : "#FAFAFA" }}
                            key={index}
                            left={props => <List.Icon {...props} icon="wallet" />}
                            right={() => props.showOptions?<IconButton icon="dots-vertical" onPress={() => { setMode({ mode: "options" }, expanse) }} />:undefined}
                            title={<Text style={styles.textNameMonth}>{expanse.desc}</Text>}
                            description={
                                <View style={styles.itemListSub}>
                                    <Text style={styles.subText}>Valor</Text>
                                    <Text style={styles.subText}>{`R$${expanse.value} ${expanse.category ? `(${expanse.category.name})` : ''}`}</Text>
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
        {props.showAdd?<Button mode="contained" style={styles.btn} icon="plus" onPress={()=>{setMode({mode: "create"})}}>Adicionar Novo Gasto</Button>: undefined}
        <ModalComponent ref={modalRef} title="Modal Gastos">
            <View style={styles.container}>
                <TextInput
                label="Descrição"
                mode="outlined"
                // right={<TextInput.Icon icon="card-text" />}
                value={desc}
                onChangeText={text => setDesc(text)}
                />
                <TextInput
                label="Valor"
                mode="outlined"
                // right={<TextInput.Icon icon="wallet" />}
                value={value}
                onChangeText={text => setValue(text)}
                />
                <Picker
                style={{backgroundColor: '#FAFAFA'}}
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                >
                    <Picker.Item label="Sem categoria" value={null} />
                    {categories?.map((category) => (
                        <Picker.Item key={category.id} label={category.name} value={category.id} />
                    ))}
                </Picker>
                {modeType?.mode === "create"? (
                    <Button icon="plus" style={styles.btn} mode="contained" onPress={createExpanse}>
                        Adicionar
                    </Button>
                ):undefined}
                {modeType?.mode === "options"? (
                    <>
                    {expenseUpdate?(
                        <>
                        <Button icon="content-save-edit" style={styles.btn} mode="contained" onPress={updateExpanse}>
                            Salvar
                        </Button>
                        <Button icon="delete" style={styles.btn} mode="contained" onPress={deleteExpanse}>
                            Deletar
                        </Button>
                        </>
                    ):(undefined)}
                    </>
                ):undefined}
            </View>        
        </ModalComponent>

        </>
    );
});

const styles = StyleSheet.create({
    container:{
        minWidth: 300,
        padding: 5,
        display: "flex",
        gap: 5
    },
    itemListSub:{
        display: "flex",
        flexDirection: "row",
        gap: 2,

    },
    subText:{
        fontSize: 12,
        color: "grey"
    },textNameMonth:{
        fontWeight: "800"
    },
    btn:{
        backgroundColor: ThemeApp.primaryColor
    }
})

export default ListExpenseComponent;
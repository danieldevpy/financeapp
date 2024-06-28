import * as React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { IconButton } from 'react-native-paper';

interface ModalProps {
    title: string;
    children: React.ReactNode;
}

export interface ModalFunctions {
    showModal: () => void;
    hideModal: () => void;
}

const ModalComponent = React.forwardRef<ModalFunctions, ModalProps>((props, ref) => {
    const [visible, setVisible] = React.useState(false);

    const showModal=()=>setVisible(true);
    const hideModal=()=>setVisible(false);

    React.useImperativeHandle(ref, () => ({
        showModal,
        hideModal,
    }));

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalText}>{props.title}</Text>
                        <IconButton {...props} icon="close" onPress={hideModal} />
                    </View>
                    {props.children}
                </View>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
   
    modalText: {
        fontSize: 16,
        fontWeight: "800"
    },
    modalHeader:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    }
});

export default ModalComponent;

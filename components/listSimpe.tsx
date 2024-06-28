import React from 'react';
import {
  SafeAreaView,
  RefreshControl,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';


export interface ItemProps {
  id: string;
  title: string;
  onclick?: () => void;
}

interface ListSimpleComponentProps {
  data?: ItemProps[];
  refresh?: () => void;
}

const ListSimpleComponent = (props: ListSimpleComponentProps) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if(props.refresh) props.refresh();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPressOut={item.onclick}>
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ListSimpleComponent;
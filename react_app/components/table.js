import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet,FlatList,Button,Alert,Picker } from 'react-native';
import { DataTable } from 'react-native-paper';
import ViewScreen from './viewScreen';
import AddForm from './add';


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
},
buttonContainer: {
    flex: 1,
},
fontStyle:{
  fontSize:20
},

})

const TableEx = ({navigation}) => {

  const [status,setStatus] = useState('available')
  const [data, setData] = useState([]);

  const DeletePet = async (petNumber) => {
    try {
     const url = 'https://petstore.swagger.io/v2/pet/' + petNumber
     const res = await fetch(url,{ method: 'DELETE' });
  } catch (error) {
     console.error(error);
   }
  }

  const fetchpets = async () => {
     try {
      const url = 'https://petstore.swagger.io/v2/pet/findByStatus?status=' + status
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
  } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
   fetchpets();
  }, [data,status]);

  return (
    <View>
      <Text style = {styles.fontStyle}>Filter:</Text>
      
      <Picker
        selectedValue={status}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
      >
        <Picker.Item label="Available" value="available" />
        <Picker.Item label="Sold" value="sold" />
        <Picker.Item label="Pending" value="pending" />
      </Picker>
    
      <Button title = "Add Pet"
           onPress={()=> {
            navigation.navigate("AddScreen")
           }}
           />

    <DataTable>
        <DataTable.Header>
          <DataTable.Title>Index</DataTable.Title>
          <DataTable.Title>Nume</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Actiuni</DataTable.Title>
        </DataTable.Header>
        
  <FlatList
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item,index }) => (
          
            <DataTable.Row>
             
             <DataTable.Cell>
            <Text style = {styles.fontStyle}>{index}</Text>
            </DataTable.Cell>
            
            <DataTable.Cell>
            <Text style = {styles.fontStyle}> {item.name}</Text>
            </DataTable.Cell>
            
            <DataTable.Cell>
           <Text style = {styles.fontStyle}> {item.status}</Text>
           </DataTable.Cell>
           
           <DataTable.Cell>
           <Button 
           style = {styles.buttonContainer}
           title = "View"
           onPress={()=> {
            navigation.navigate('ViewScreen',{elemIndex:index})
           }}
           />
           
           <Button 
           style = {styles.buttonContainer}
           title = "Edit"
           onPress={()=> {
            navigation.navigate('EditScreen',{pet:item.name})
           }}
           />
           
           <View style={styles.screen}>
           <Button 
           style = {styles.buttonContainer}
           title = "Delete"
           onPress={()=>{
            DeletePet(index)
          
            
            }}
          />
           </View>
      </DataTable.Cell>
  </DataTable.Row>
          )}
        />
        
        
      </DataTable>
    
    </View>
   
  );
}

export default TableEx
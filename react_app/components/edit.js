import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet,FlatList,Button } from 'react-native';
import { Form, FormItem } from 'react-native-form-component';
import { Picker } from 'react-native-form-component';

const EditScreen = ({route})=>{

    const[name, setName] = useState(route.params.pet)
    const [status, setStatus] = useState("available");
    const [data, setData] = useState([]);

const editPet = async (name,status)=>{
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: name,
          status:status 
        
        })
    };

    try {
        const url = 'https://petstore.swagger.io/v2/pet'
        const response = await fetch(url,requestOptions);
        const json = await response.json();
        setData(json);
      } catch (error) {
        
        console.error(error);
      }
    }



    return(
    <Form onButtonPress={() => {
      if(name !== '' ){
        alert('Request succesfull')
       editPet(name,status)
       navigation.navigate('TableEx')
      }
  }}>
        <FormItem 
         label="Name"
         isRequired
         value={name}
         onChangeText={(name) => setName(name)}
        />
        <Picker
    items={[
      { label: 'available', value: 'available'},
      { label: 'sold', value: 'sold' },
      { label: 'pending', value: 'pending' },
    ]}
    label="Status"
    selectedValue={status}
    onSelection={(item) => setStatus(item.value)}
  />
  </Form>
    )
}

export default EditScreen
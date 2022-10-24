
import { View, Text, TextInput, TouchableHighlight,StyleSheet,Button,Alert, ProgressViewIOSComponent } from 'react-native';
import { useForm,Controller } from "react-hook-form";
import Constants from 'expo-constants';
import { Form, FormItem } from 'react-native-form-component';
import React, { createRef, useState } from 'react';
import { Picker } from 'react-native-form-component';
import { number } from 'prop-types';


const AddScreen = ({navigation}) => {
 
 
  const[name, setName] = useState('')
  const[id, setId] = useState('')
  const [status, setStatus] = useState("available");
  const [data, setData] = useState([]);

  const AddPetForm = async (name,id,status)=>{

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: name,
        id:id,
        status:status 
      
      })
  };

    try {
      const url = 'https://petstore.swagger.io/v2/pet'
      const response = await fetch(url,requestOptions);
      const json = await response.json();
      setData(json);
      
      console.log(status_code)
  } catch (error) {
      console.error(error);
    }
  }

  return (
    
    <Form onButtonPress={() => {
      if(name !== '' && id !== ''){
        alert('Request succesfull')
      AddPetForm(name, id, status)
     navigation.navigate('TableEx')
      }
}}>
      <FormItem 
       label="Name"
       isRequired
       value={name}
       onChangeText={(name) => setName(name)}
      />
      <FormItem
      label = "Id"
      isRequired
      value = {id.replace(/[^0-9]/g, '')}
      onChangeText={(id) => setId(id)}
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
  );
}

export default AddScreen

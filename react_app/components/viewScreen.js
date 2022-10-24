import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet,FlatList,Button } from 'react-native';
import { Avatar,  Card, Title, Paragraph } from 'react-native-paper';



const ViewScreen = ({route})=>{

    const [data, setData] = useState('')

    const styles = StyleSheet.create = ({
      title:{
        fontSize:30
      },
      para: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
      }
    })
    
    
    const fetchpets = async () => {
        try {
         const url = 'https://petstore.swagger.io/v2/pet/' + route.params.elemIndex
         const response = await fetch(url);
         const json = await response.json();
        setData(json);
     
       } catch (error) {
       
        console.log(error)
         
       }
     }
   
     useEffect(() => {
      fetchpets();
     }, [route.params.elemIndex]);
   

    return(
      <Card>
      <Card.Content>
      <Title style = {styles.title}>Pet</Title>
      <Paragraph></Paragraph>
      {data.type === 'error' &&<Paragraph style = {styles.para}>Acest element nu exista</Paragraph>}
      {data.type !== 'error' &&
      <Card.Content>
      <Paragraph style = {styles.para}>{data.id}</Paragraph>
      <Paragraph style = {styles.para}>{data.name}</Paragraph>
      <Paragraph style = {styles.para}>{data.status}</Paragraph>
      </Card.Content>
}
</Card.Content>
</Card>
        
        
    )

    
}

export default ViewScreen
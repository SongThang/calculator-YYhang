import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default (AllButton = ({text,onClick}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Text style={styles.text}> {text} </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#000",
        borderWidth: 0.3,
        borderRadius: 20,
        margin:3,
    },
    text:{
        fontSize:48,
        color: '#faf',
    }
});
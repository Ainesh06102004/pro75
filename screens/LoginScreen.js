import * as React from "react";
import {Alert, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView} from "react-native";
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:"",
            password:"",
        }
    }

    Login = async(email, password)=>{
        if(email && password){
            try{
                const response = await firebase.auth()
                .signInWithEmailAndPassword(email, password)
                if(response){
                    this.props.navigation.navigate("WriteStory")
                }
            }
            catch (error){
                switch(error.code){
                    case "auth/user-not-found":
                        Alert.alert("User doesn't exist")
                        console.log("doesn't exist")
                        break;
                    case "auth/invalid-email":
                        Alert.alert("Incorrect email or Password")
                        console.log("Invalid")
                }
            }   
        }
        else{
            Alert.alert("Enter Email And Password")
        }
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container}>
                <View>
                    <Text style={styles.text}>Story Hub</Text>
                </View>
                <View>
                    <TextInput 
                        style={styles.loginBox}
                        placeholder="abc@example.com"
                        keyboardType="email-address"
                        onChangeText={(text)=>{
                            this.setState({
                                emailId : text,
                            })
                        }}
                    />
                    <TextInput 
                        style={styles.loginBox}
                        placeholder="Enter Password"
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({
                                password : text,
                            })
                        }}
                    />
                </View>
                <View>
                    <TouchableOpacity 
                        style={{
                            height:40,
                            width:200,
                            borderWidth:1,
                            marginTop:40,
                            paddingTop:10,
                            borderRadius:15,
                            alignSelf:"center",
                            backgroundColor: 'red',
                        }}
                        onPress={()=>{
                            this.Login(this.state.emailId,this.state.password)
                        }}>
                        <Text style={{textAlign:"center", fontWeight:"bold", fontSize:23}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        backgroundColor:'white',
    },
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
        alignSelf:"center",
        justifyContent: 'center',
    },
    text:{
        fontSize:30,
        textAlign:"center",
        marginBottom:50,
        alignSelf:"center",
        backgroundColor:'red',
        height:60,
        width:120,
        paddingTop:13,
        borderWidth:3,
        borderRadius:1,
        
    },
    });
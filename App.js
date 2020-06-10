/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends React.Component{

/* create constructor and declare states in this */
    constructor(props){
        super(props);
        this.state = {
            isLoading : true,
            text : '',
            data : []
        }
        this.arrayholder = [];
    }

    /* call function componentDidMount to get data from web url and parse json data */

    componentDidMount(){

        /* call api with fetch method */

        return fetch('https://jsonplaceholder.typicode.com/users')
        .then((response)=> response.json())
        .then((responseJson)=> {
            console.log(responseJson);
            this.setState(
            {
                isLoading: false,
                data:responseJson,
            }, () =>{
              this.arrayholder = responseJson;
            }
            );
        } ).catch((error) => {
            console.log(error);
        });
    }

    GetFlatListItem(name){
        Alert.alert('Clicked on '+name);
    }

      itemSeparator = () => {

            return(
            <View
            style = {{
            width : "100%",
            height: .5,
            backgroundColor : "#000",
            }}

            />

            );
      }

    render()
    {
        /* show loader till api has called, when we get data show flat list with data fetched from response */
        console.log(this.state.isLoading);
        if(this.state.isLoading){
            return(
            <View style = {{ flex : 1 , paddingTop: 50 }}>
            <ActivityIndicator/>
            </View>
            );
        }
        return (
            <View style = { { width:"100%"}}>
                <Text style = {{textAlign : 'center' , margin: 20}}> Data loaded from web api  </Text>

                <FlatList
                data= {this.state.data}
                keyExtractor={(item,index) => index.toString()}
                ItemSeparatorComponent = {this.itemSeparator}
               renderItem={({ item }) => <Text style={styles.row}
                         onPress={this.GetFlatListItem.bind(this, item.name)}>{item.name}</Text>}
                         style={{ marginTop: 10 }} />

            </View>
        );

    }

}


const styles = StyleSheet.create({

  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 5,

  },

  row: {
    fontSize: 18,
    padding: 12
  },

  textInput: {

    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: "#FFFF"

  }
});

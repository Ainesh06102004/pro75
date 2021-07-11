import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {SearchBar,Header} from 'react-native-elements';
import db from '../config'

export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      allStories:[],
      dataSource:[],
      search : '',
    }
  }

  retrieveStories=()=>{
    var allStories= []
    var stories = db.collection("userStory")
    .get().then((query)=> {
      query.forEach((doc)=> { 
          allStories.push(doc.data())
        })
      this.setState({allStories})
      })
  }

  componentDidMount(){
    this.retrieveStories()
  }

  searchFunction(text) {
    const Data = this.state.allStories.filter((item)=> {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: Data,
      search: text,
    });
  }

  render(){
    return(
      <View>
        <Header 
          backgroundColor = {'red'}
          centerComponent = {{
            text : 'Story Hub',
            style : { color: 'black', fontSize: 30, fontWeight:"bold"}
          }}/>
        <View>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={text => this.searchFunction(text)}
            value={this.state.search}/>
        </View>
      
        <FlatList
          data={this.state.search === "" ?  this.state.allStories: this.state.dataSource}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text>  Title: {item.title}</Text>
              <Text>  Author : {item.author}</Text>
            </View>
          )}
          keyExtractor={(index) => index.toString()}
          onEndReached = {this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}/>
      </View>  
    );      
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent:'center',
    width:'100%',
    height: 80,
    alignSelf: 'center',
    borderWidth: 2,
  }
});
import { View, Text, FlatList, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React, { Component } from 'react';
import { AudioContext } from '../context/AudioProvider';
import AudioListItem from '../components/AudioListItem';
import {RecyclerListView, LayoutProvider} from 'recyclerlistview'
import OptionModal from '../components/OptionModal';
import { Audio } from 'expo-av';


export class AudioList extends Component {
    static contextType = AudioContext;

    constructor(props){
        super(props);
        this.state = {
            optionModalVisible: false,
            playbackObj: null,
            soundObj: null,
            currentAudio: {},
        };
        this.currentItem = {
            filename:""
        };
    }

    
    handlePress = async (audio) => {
        // play first
        if(this.state.soundObj === null){
            const playbackObj = new Audio.Sound();
            const status = await playbackObj.loadAsync(
                {uri: audio.uri}, {shouldPlay: true}
            );
            return this.setState({...this.state, playbackObj: playbackObj, 
              soundObj: status, currentAudio: audio});
        }
        // Pause audio
        if(this.state.soundObj.isLoaded && this.state.soundObj.isPlaying){
            const status = await this.state.playbackObj.setStatusAsync({shouldPlay: false});
            return this.setState({...this.state, soundObj: status})
        }
        // resume audio
        if(this.state.soundObj.isLoaded && !this.state.soundObj.isPlaying){
            if(this.state.currentAudio.id === audio.id ){
                const status = await this.state.playbackObj.playAsync();
                return this.setState({...this.state, soundObj: status})
            } 
            this.state.playbackObj.unloadAsync();
            const status = await this.state.playbackObj.loadAsync(
              {uri: audio.uri}, {shouldPlay: true}
            );
          return this.setState({...this.state, soundObj: status, currentAudio: audio});
      }
    }


    rowRenderer = (type, item) => {
        return <AudioListItem file={item} onOptionPress={()=>{
            this.setState({...this.state, optionModalVisible: true});
            this.currentItem = item;
        }}
        onSongPress={() => this.handlePress(item)}/>
    };
    layoutProvider = new LayoutProvider(
      (i) => "audio", 
      (type, dim)=>{
          switch(type){
              case "audio":
                dim.width = Dimensions.get('window').width;
                dim.height = 70;
                break;
              default:
                dim.width = 0;
                dim.height = 0;

          }
      });

    render(){
      
      return (
          <AudioContext.Consumer>
            {({dataProvider})=>{
              return (
                <View style={{
                    flex: 1,
                }}>
                    <RecyclerListView 
                      dataProvider={dataProvider} 
                      layoutProvider={this.layoutProvider}
                      rowRenderer={this.rowRenderer} />
                    <OptionModal visible={this.state.optionModalVisible} 
                      item={this.currentItem}
                      onClose={()=>this.setState({...this.state, optionModalVisible: false})}
                      onPlayPress={()=> console.log("play audio")}
                      onPlaylistPress={()=> console.log("playlist pressed")}
                      />
                </View>
              )
            }}
          </AudioContext.Consumer>
      )
    }
}

export default AudioList;
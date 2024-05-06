import { Text, View, Alert } from 'react-native';
import React, { Component, createContext } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';


export const AudioContext = createContext();

export class AudioProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            audioFiles: [],
            dataProvider: new DataProvider((r1, r2)=>r1 !== r2)
        }
    }

    permissionAlert = () =>{
        Alert.alert("Permission Required", 
        "This app needs to read audio files!",
        [{
            text: "i am ready",
            onPress: ()=>this.getPermission()
        },{
            text: "cancel",
            onPress: () => this.permissionAlert()
        }])
    }

    getAudioFiles = async () => {
        const {dataProvider, audioFiles} = this.state;
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio'
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
        });
        // console.log(media.assets.length);
        this.setState({...this.state, dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]),
            audioFiles: [...audioFiles, ...media.assets]})
    }

    getPermission = async () => {
        // {
        //     "canAskAgain": true,
        //     "expires": "never",
        //     "granted": false,
        //     "status": "undetermined",
        //   }
        const permission = await MediaLibrary.getPermissionsAsync();
        if(permission.granted){
            this.getAudioFiles();
        }
        if(!permission.granted && permission.canAskAgain){
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync()
            if(status==="denied" && canAskAgain){
                // must allow this permision to run this app
                this.permissionAlert();
            }
            if(status==='granted'){
                this.getAudioFiles();
            }
            if(status==="denied" && !canAskAgain){
                // show error
            }
        }
    }
    
    componentDidMount(){
        this.getPermission();
    }
    render() {
        const { audioFiles, dataProvider } = this.state
        return (
            <AudioContext.Provider value={{audioFiles, dataProvider}}>
                {this.props.children}
            </AudioContext.Provider>
        )
    }
}

export default AudioProvider
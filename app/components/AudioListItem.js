
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import color from "../constants/color";
import { removeFileType } from '../constants/Helper';


const AudioListItem = ({file, onOptionPress, onSongPress}) => {
    const convertSecToMin = (secs) => {
        var min = Math.floor(secs/60);
        var hr = min > 59 ? Math.floor(min/60) : 0;
        min = hr > 0 ? min - 60 : min;
        var remsec = Math.floor(secs - (min*60));
        min = min < 10 ? "0" + min : min;
        remsec = remsec < 10 ? "0" + remsec : remsec;
        return (hr > 0 ? hr + ":" : "")+ min + ":" + remsec;
    }
      
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.leftcontainer} 
                onPress={onSongPress}>
                <View style={styles.thumbnail}>
                    <Entypo name="music" size={20} color={color.FONT} />
                </View>
                <View style={styles.textcontainer}>
                    <Text numberOfLines={1} style={{
                        fontWeight: '500',
                    }}>
                        {removeFileType(file.filename)}
                    </Text>
                    <Text style={{color: color.FONT_MEDIUM, fontSize: 12,}}>
                        {convertSecToMin(file.duration)}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{
                    alignItems: 'center',
                    height: "100%",
                    justifyContent: 'center',
                    width: 40,
                }}
                onPress={onOptionPress}>
                <Entypo name="dots-three-vertical" size={20} color={color.FONT_MEDIUM} />
            </TouchableOpacity>
        </View>
    )
}

const {width} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 2,
        borderBottomColor: "#3333",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: width-10,
        padding: 5,
        marginVertical: 5,
        borderRadius: 2,
        flex: 1,
    },
    leftcontainer : {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    thumbnail: {
        backgroundColor: color.FONT_LIGHT,
        padding: 10,
        margin: 5,
        borderRadius: 25,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textcontainer: {
        width: width-110,
    }
})

export default AudioListItem
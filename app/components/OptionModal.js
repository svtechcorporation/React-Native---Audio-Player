import { View, Text, Modal, StyleSheet, TouchOpacity, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { StatusBar } from 'react-native';
import color from '../constants/color';
import { removeFileType } from '../constants/Helper';


const OptionModal = ({visible, onClose, item, onPlayPress, onPlaylistPress}) => {
  return (
    <View>
        <StatusBar />
        <Modal
            visible={visible}
            transparent
            animationType='slide'
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={{
                    backgroundColor: color.MODAL_BG,
                    width: "100%",
                    height: "100%",
                }}></View>
            </TouchableWithoutFeedback>
            <View style={{
                backgroundColor: color.APP_BG,
                position: 'absolute',
                bottom: 0,
                padding: 20,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 20,
            }}>
                <Text style={{
                    fontWeight: '500',
                    fontSize: 18,
                    marginBottom: 20,
                    color: color.FONT_MEDIUM,
                    textAlign: 'center',
                }}>{removeFileType(item.filename)}</Text>
                <TouchableOpacity style={styles.textbtn} onPress={onPlayPress}>
                    <Text style={styles.btntitle}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.textbtn} onPress={onPlaylistPress}>
                    <Text style={styles.btntitle}>Add to Playlist</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    textbtn: {
        fontSize: 14,
        padding: 10,
        marginTop: -1,
        width: "100%",
        alignItems: 'center',
    },
    btntitle: {
        fontWeight: "500",

    }
})

export default OptionModal
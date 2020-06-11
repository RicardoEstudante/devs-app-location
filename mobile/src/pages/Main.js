import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import  MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';


function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);
    // pegando a localização do usuario caso for permitido
    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if(granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }

        loadInitialPosition();
    }, []);

    if(!currentRegion) {
        return null;
    }

    return (
    <MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={currentRegion} >
            <Image style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/42756551?s=460&u=e4475ddca2f9c544b67ea619c636d50512d54be0&v=4' }} />
        
            <Callout onPress={() => {
                navigation.navigate('Profile', { github_username: 'RicardoEstudante' });
            }}>
                <View style={styles.callout}>
                    <Text style={styles.devName}>Ricardo Carvalho Santos</Text>
                    <Text style={styles.devBio}>Bom dia </Text>
                    <Text style={styles.devTechs}>ReactJS, React Native, Node</Text>
                </View>
            </Callout>
        </Marker>
    </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
         flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    },

    callout: {
        width: 250,
    },
    
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    }
})

export default Main;
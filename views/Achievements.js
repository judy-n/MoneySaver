import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faLock, faStar, faUserGraduate, faUserTie, faDiceOne } from '@fortawesome/free-solid-svg-icons'
import { borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
import { library } from '@fortawesome/fontawesome-svg-core'
import AppLoading from 'expo-app-loading'
import {
    useFonts,
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic
} from '@expo-google-fonts/dm-sans'


library.add(faCoffee, faLock, faStar, faUserGraduate, faUserTie, faDiceOne)


export default function Achievements({ achievements }) {
    let [fontsLoaded] = useFonts({
        DMSans_400Regular,
        DMSans_400Regular_Italic,
        DMSans_500Medium,
        DMSans_500Medium_Italic,
        DMSans_700Bold,
        DMSans_700Bold_Italic
    })

    if (!fontsLoaded) {
        return <AppLoading/>
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>My Achievements</Text>
                <View style={styles.achievements}>
                    {
                        achievements.map((ach, index) => {
                            return (
                                <View style={styles.achievement} key={index}>
                                    <FontAwesomeIcon
                                        style={ach.completed ? [styles.complete, {color: ach.color}] : [styles.incomplete]}
                                        icon={ach.completed ? ach.icon : "lock"}
                                        size={64}
                                    />
                                    <View>
                                        <Text
                                            style={ach.completed ? styles.achievementText : [styles.achievementText, styles.incomplete]}>
                                            {ach.text}
                                        </Text>
                                        <Text
                                            style={ach.completed ? styles.achievementSub : [styles.achievementSub, styles.incomplete]}>
                                            {ach.subtitle}
                                        </Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                    <View style={styles.achievement}>
                        <Text style={styles.achievementText}>
                            More coming soon...
                        </Text>
                    </View>
                </View>
            </View>
        );}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        padding: 32,
    },
    title: {
        fontSize: 25,
        fontFamily: "DMSans_400Regular",
        color: "#8AAF8E"
    },
    achievements: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        backgroundColor: '#EFEFEF',
        flexGrow: 1,
        borderRadius: 5,
        shadowColor: 'black',
        shadowRadius: 1,
        marginTop: 20,
        padding: 8,
    },
    text: {
        color: "ivory",
        fontFamily: "DMSans_700Bold",
        fontSize: 20,
    },
    achievement: {
        width: '100%',
        padding: 15,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2,
    },
    achievementText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#8AAF8E',
        fontFamily: "DMSans_700Bold"
    },
    achievementSub: {
        fontSize: 8,
        fontWeight: '300',
        color: '#8AAF8E',
        fontFamily: "DMSans_700Bold",
        textAlign: "right"
    },
    incomplete: {
        color: 'gray'
    },
    complete: {
        color: '#8AAF8E'
    }
});

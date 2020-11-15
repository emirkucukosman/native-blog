import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const SplashScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" animating={true} />
        </View>
    )
}

export default SplashScreen

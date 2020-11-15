import React, { useEffect, useState } from 'react'
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    StyleSheet, 
    Alert
} from 'react-native'

import { connect } from 'react-redux'

import { loginUser } from '../redux/actions/authActions'

const LoginScreen = ({
    error,
    loginUser
}) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const loginPressed = () => {
        loginUser({ username, password })
    }

    useEffect(() => {
        if (error.id === "LOGIN_FAIL") {
            Alert.alert(error.message)
        }
    }, [error.id, error.message])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Login Screen
            </Text>
            <View style={styles.form}>
                <TextInput
                    autoCapitalize="none"
                    placeholder="Username"
                    textContentType="username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    style={styles.textField}
                />
                <TextInput
                    autoCapitalize="none"
                    placeholder="Password"
                    textContentType="password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={[styles.textField, { marginTop: 20 }]}
                />
                <TouchableOpacity
                    onPress={loginPressed}
                    activeOpacity={0.9}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Log In
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 24,
        marginTop: 24
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: 24,
        marginTop: 24
    },
    textField: {
        width: "100%",
        borderBottomColor: "indigo",
        borderBottomWidth: 1,        
        paddingBottom: 8,
        fontSize: 16
    },
    button: {
        width: "100%",
        backgroundColor: "indigo",
        padding: 12,
        borderRadius: 12,
        marginTop: 30
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 18
    }
})

const mapStateToProps = (state) => ({
    error: state.error
})

export default connect(
    mapStateToProps, { loginUser }
)(LoginScreen)

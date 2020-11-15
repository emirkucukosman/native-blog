import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'

import { logoutUser, validateToken } from './redux/actions/authActions'

const Home = ({
    isAuthLoading,
    isLoginSuccess,
    isLogoutSuccess,
    logoutUser,
    validateToken
}) => {

    const [loading, setLoading] = useState(false)
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        validateToken()
    }, [])

    useEffect(() => {
        setLoading(isAuthLoading)
    }, [isAuthLoading])

    useEffect(() => {
        setAuthorized(isLoginSuccess)
    }, [isLoginSuccess])

    useEffect(() => {
        setAuthorized(!isLogoutSuccess)
    }, [isLogoutSuccess])

    if (loading) {
        return <SplashScreen />
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {authorized ? (
                  <>
                    <Stack.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            headerRight: () => (
                                <Button
                                    onPress={logoutUser}
                                    title="Logout"
                                    color="red"                                
                                />
                            )
                        }}
                    />                    
                  </>  
                ) : (
                   <>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            animationTypeForReplace: isLogoutSuccess ? 'pop' : 'push'
                        }}
                    />
                   </> 
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = (state) => ({
    isAuthLoading: state.auth.isAuthLoading,
    isLoginSuccess: state.auth.isLoginSuccess,
    isLogoutSuccess: state.auth.isLogoutSuccess,
})

export default connect(
    mapStateToProps, { logoutUser, validateToken }
)(Home)

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Platform,
    Alert
} from 'react-native'

import { fetchBlogs } from '../redux/actions/blogActions'

import SplashScreen from './SplashScreen'

const ProfileScreen = ({
    isBlogsLoading,
    blogs,
    error,
    fetchBlogs
}) => {

    useEffect(() => {
        if (error.id === "FETCH_BLOGS_FAIL") {
            Alert.alert(error.message)
        }
    }, [error.id, error.message])

    useEffect(() => {
        fetchBlogs()
    }, [])

    if (isBlogsLoading) {
        return (
            <SplashScreen />
        )
    }

    if (blogs != null) {
        return (
            <FlatList
                ItemSeparatorComponent={
                    Platform.OS !== 'android' &&
                    (({ highlighted }) => (
                        <View
                            style={[
                                styles.separator,
                                highlighted && { marginLeft: 0 }
                            ]}
                        />
                    ))
                }
                data={blogs}
                keyExtractor={({ _id }) => _id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={{ marginTop: 8 }}>{item.body}</Text>
                        <View style={styles.itemDate}>
                            <Text style={styles.dateText}>{new Date(item.createdAt).toDateString()}</Text>
                        </View>                        
                    </View>
                )}
            />
        )
    } else {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>No Blogs Found</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 24
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "bold"
    },
    itemDate: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    dateText: {
        fontSize: 11,
        color: "gray"
    }, 
    separator: {
        borderColor: "lightgray",
        borderWidth: 1,
    }
})

const mapStateToProps = (state) => ({
    isBlogsLoading: state.blog.isBlogsLoading,
    blogs: state.blog.blogs,
    error: state.error
})

export default connect(
    mapStateToProps, { fetchBlogs }
)(ProfileScreen)

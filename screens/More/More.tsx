import {View, Text, Button} from "react-native";
import React from "react";
import {getAuth, signOut as signOutFirebase} from "firebase/auth";

const auth = getAuth(); // Get firebase auth instance

const handleSignOut = () => {
    signOutFirebase(auth)
        .then(() => {
            // Sign-out successful.
            console.log('User signed out');
        })
        .catch((error) => {
            console.error('Sign out error:', error.message);
        });
}

export default function More() {
    return (
        <View>
            <Text>More</Text>
            <Button title="Sign out" onPress={handleSignOut}></Button>
        </View>
    );
}


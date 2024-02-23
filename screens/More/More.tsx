import {View, Text, Image, Pressable} from "react-native";
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
    if (!auth.currentUser) {
        return (
            <View className="h-full bg-gray-300 py-1">
                <View className="bg-white mx-2 my-1 p-4 rounded">
                    <Text className="text-lg font-bold" >Not signed in</Text>
                </View>
            </View>
        );
    }

    return (
        <View className="h-full bg-gray-300 py-1">
            <View className="bg-white mx-2 my-1 p-4 rounded">
                <View className="flex flex-row items-center gap-3 relative">
                    <Image className="w-16 h-16" source={require("../../assets/default_pfp.png")}></Image>
                    <View>
                        <Text className="text-lg font-bold" >{auth.currentUser.email}</Text>
                        <Text className="text-sm text-gray-500">Account created 2024</Text>
                    </View>
                    <Pressable onPress={handleSignOut} className="bg-red-500 rounded-lg p-1 absolute right-0">
                        <Text className="text-md text-white font-bold">Sign Out</Text>
                    </Pressable>
                </View>
            </View>

        </View>
    );
}


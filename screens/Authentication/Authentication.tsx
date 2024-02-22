import {useState} from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {Pressable, Text, View} from "react-native";

enum AuthPageShown {
    SignUp,
    SignIn,
}

export default function Authentication() {
    // State for whether sign in or sign up form is shown
    const [authPageShown, setAuthPageShown] = useState<AuthPageShown>(AuthPageShown.SignUp);

    // JSX elements for switching between sign up and sign in
    const AuthPageSwitcher =
        authPageShown === AuthPageShown.SignUp ? (
            <View className="flex flex-row justify-center items-center gap-2">
                <Text className="text-base">Already have an account?</Text>
                <Pressable onPress={() => setAuthPageShown(AuthPageShown.SignIn)}>
                    <Text className="text-base text-blue-500">Sign in</Text>
                </Pressable>
            </View>
        ) : (
            <View className="flex flex-row justify-center items-center gap-2">
                <Text className="text-base">Don't have an account?</Text>
                <Pressable onPress={() => setAuthPageShown(AuthPageShown.SignUp)}>
                    <Text className="text-base text-blue-500">Sign up</Text>
                </Pressable>
            </View>
        );

    return (
        <View className="flex gap-y-5 mt-16 ml-10 mr-10 mb-20 ">
            {authPageShown === AuthPageShown.SignUp ? <SignUp/> : <SignIn/>}
            {AuthPageSwitcher}
        </View>
    )
}
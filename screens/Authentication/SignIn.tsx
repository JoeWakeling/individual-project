import { useState, useRef} from "react";
import {Text, TextInput, View, Pressable} from "react-native";
import {getAuth, signInWithEmailAndPassword as signInFirebase} from "firebase/auth";

const auth = getAuth(); // Get firebase auth instance

const handleSignIn = (email: string, password: string) => {
    // Todo: Add client side validation

    signInFirebase(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User signed in:', user);
        })
        .catch((error) => {
            console.error('Sign in error:', error.message);
        });
};

export default function SignIn() {
    // Ref for password input (used for switching focus when uses presses return on virtual keyboard in email field)
    const passwordInputRef = useRef<TextInput>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View className="flex gap-y-5 justify-center items-center">
            <Text className="text-3xl font-bold">Sign in to your account</Text>
            <View className="flex gap-y-3 w-full">
                <TextInput
                    className="border border-gray-400 p-2 rounded-md w-full"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                />
                <TextInput
                    className="border border-gray-400 p-2 rounded-md w-full"
                    ref={passwordInputRef}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    onSubmitEditing={() => handleSignIn(email, password)}
                />
            </View>
            <Pressable onPress={() => handleSignIn(email, password)}>
                <Text className="text-base text-blue-500">Sign In</Text>
            </Pressable>
        </View>
    );
}
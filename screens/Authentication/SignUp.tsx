import { useState, useRef} from "react";
import {Text, TextInput, View, Pressable} from "react-native";
import {getAuth, createUserWithEmailAndPassword as signUpFirebase} from "firebase/auth";

const auth = getAuth(); // Get firebase auth instance

const handleSignUp = (email: string, password: string) => {
    // Todo: Add client-side validation

    signUpFirebase(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User signed in:', user);
        })
        .catch((error) => {
            console.error('Sign in error:', error.message);
        });
};


export default function SignUp() {
    // Ref for password input (used for switching focus when uses presses return on virtual keyboard in email field)
    const passwordInputRef = useRef<TextInput>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View className="flex gap-y-5 justify-center items-center">
            <Text className="text-3xl font-bold">Create your free account</Text>
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
                    onSubmitEditing={() => handleSignUp(email, password)}
                />
            </View>
            <Pressable onPress={() => handleSignUp(email, password)}>
                <Text className="text-base text-blue-500">Sign Up</Text>
            </Pressable>
        </View>
    );
}

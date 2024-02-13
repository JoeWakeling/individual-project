import React, { useState } from 'react';
import {View, TextInput,StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

interface InstrumentSearchBoxProps {
    onSearch: (query: string) => void; // Define the type for the onSearch prop
}

export default function InstrumentSearchBox({ onSearch } : InstrumentSearchBoxProps) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {onSearch(query)};

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search..."
                onChangeText={text => setQuery(text)}
                onSubmitEditing={handleSearch}
                value={query}
            />
            <TouchableOpacity onPress={handleSearch} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="search" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    input: {
        flex: 1,
        marginRight: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ccc',
    },
});
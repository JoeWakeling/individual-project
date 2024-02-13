import {StyleSheet, Text, View} from "react-native";

export default function InstrumentListBox(quote: Quote) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text>Shortname: {quote.shortname}</Text>
                <Text>Symbol: {quote.symbol}</Text>
            </View>
            <View style={styles.row}>
                <Text>Exchange: {quote.exchDisp}</Text>
            </View>
            <View style={styles.row}>
                <Text>Type: {quote.quoteType}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginVertical: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    value: {
        flex: 1,
        textAlign: 'right',
    },
});
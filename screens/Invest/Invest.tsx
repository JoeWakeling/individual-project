import {Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useLayoutEffect, useState} from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView} from "react-native-gesture-handler";
import Suggestions from "./Suggestions";
import {useNavigation} from "@react-navigation/native";

export default function Invest() {
    DropDownPicker.setListMode("MODAL");

    const navigation = useNavigation();

    const [riskTolerance, setRiskTolerance] = useState(-1);

    const [age, setAge] = useState('');
    const [educationLevel, setEducationLevel] = useState(null);
    const [maritalStatus, setMaritalStatus] = useState(null);
    const [workStatus, setWorkStatus] = useState(null);
    const [income, setIncome] = useState('');
    const [personalFinanceKnowledge, setPersonalFinanceKnowledge] = useState('');
    const [attitudeToBorrowing, setAttitudeToBorrowing] = useState(null);

    const [educationLevelPickerOpen, setEducationLevelPickerOpen] = useState(false);
    const [maritalStatusPickerOpen, setMaritalStatusPickerOpen] = useState(false);
    const [workStatusPickerOpen, setWorkStatusPickerOpen] = useState(false);
    const [attitudeToBorrowingPickerOpen, setAttitudeToBorrowingPickerOpen] = useState(false);

    const [educationLevelOptions, setEducationLevelOptions] = useState([
        {label: 'No formal education', value: '-1'},
        {label: 'Primary School (reception - year 5)', value: '1'},
        {label: 'Primary School (year 6)', value: '2'},
        {label: 'Secondary School (year 7/8/9)', value: '3'},
        {label: 'Secondary School (year 10)', value: '4'},
        {label: 'Secondary School (year 11)', value: '5'},
        {label: 'Sixth form (year 12, no qualifications)', value: '6'},
        {label: 'Sixth form (year 13, no qualifications)', value: '7'},
        {label: 'Sixth form (A Levels, AS Levels or IB)', value: '8'},
        {label: 'College (no qualifications)', value: '9'},
        {label: 'College (vocational qualification)', value: '10'},
        {label: 'College (A Levels, AS Levels or IB)', value: '11'},
        {label: 'Bachelor\'s Degree (e.g. BA, AB, BS)', value: '12'},
        {label: 'Master\'s degree (e.g. MA, MS, MENG)', value: '13'},
        {label: 'Professional school degree (e.g. MD DDS, DVM) or Doctorate (e.g. PhD, DPhil)', value: '14'},
    ]);

    const [maritalStatusOptions, setMaritalStatusOptions] = useState([
        {label: 'Married', value: '1'},
        {label: 'Living with partner', value: '2'},
        {label: 'Separated', value: '3'},
        {label: 'Divorced', value: '4'},
        {label: 'Widowed', value: '5'},
        {label: 'Never married', value: '6'},
        {label: 'NA (age < 17)', value: '7'},
    ]);

    const [workStatusOptions, setWorkStatusOptions] = useState([
        {label: 'Employed/self-employed', value: '1'},
        {label: 'Temporarily laid off', value: '2'},
        {label: 'Unemployed & looking for work', value: '3'},
        {label: 'Unemployed due to disability', value: '6'},
        {label: 'Student', value: '4'},
        {label: 'Homemaker', value: '5'},
        {label: 'Retired', value: '7'},
        {label: 'On sick/maternity leave', value: '8'},
        {label: 'Voluntary work', value: '10'},
        {label: 'On vacation/other short term leave of absence', value: '11'},
        {label: 'On sabbatical/other extended leave of absence', value: '13'},
        {label: 'On strike', value: '15'},
        {label: 'Other & not looking for work', value: '16'},
    ]);

    const [attitudeToBorrowingOptions, setAttitudeToBorrowingOptions] = useState([
        {label: 'Good idea', value: '1'},
        {label: 'Good in some ways, bad in others', value: '2'},
        {label: 'Bad idea', value: '3'},
    ]);

    const onSubmit = () => {
        // Create JSON object with form data, mapping strings to ints
        const data = {
            x: [[age, educationLevel, maritalStatus, workStatus, income, personalFinanceKnowledge, attitudeToBorrowing]].map(x => x.map(y => parseInt(y)))
        }
        console.log(data)

        // Make request to ML API server with form data
        fetch('http://192.168.0.146:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to get prediction from ML API');
        }).then(result => {
            setRiskTolerance(result["prediction"]);
        }).catch(error => {
            console.error('Error:', error);
        });

    }

    const retry = () => {
        setRiskTolerance(-1);
        navigation.setOptions({
            headerLeft: () => (<></>),
        });
    }

    if (riskTolerance !== -1) {
        return (
            <Suggestions riskTolerance={riskTolerance} retry={retry}/>
        )
    }

    return (
        <View className="bg-gray-100 h-full">
            <View className={"items-center"}>

            </View>
            <View className="bg-white p-2 items-center shadow-lg">
                <Text className="text-lg font-bold">Risk Tolerance Questionnaire</Text>
                <Text className="text-sm">This questionnaire will be used to assess your risk tolerance and recommend suitable investments.</Text>
            </View>

            <ScrollView>
                <View className="bg-white mx-4 my-2 p-2 rounded-lg items-center shadow-lg">
                    <Text className="text-lg font-bold">Question 1</Text>
                    <Text className="text-sm">What is your age?</Text>
                    <TextInput
                        className="m-1 border border-gray-400 rounded-lg p-2"
                        keyboardType="numeric"
                        placeholder="e.g. 21"
                        value={age}
                        onChangeText={setAge}
                    />
                </View>
                <View className="bg-white mx-4 my-2 p-2 rounded-lg items-center shadow-lg">
                    <Text className="text-lg font-bold">Question 2</Text>
                    <Text className="text-sm">Which option best describes your education level?</Text>
                    <View className="my-2 mx-5">
                        <DropDownPicker
                            open={educationLevelPickerOpen}
                            value={educationLevel}
                            items={educationLevelOptions}
                            setOpen={setEducationLevelPickerOpen}
                            setValue={setEducationLevel}
                            setItems={setEducationLevelOptions}
                        />
                    </View>
                </View>
                <View className="bg-white mx-4 my-2 p-2 rounded-lg items-center shadow-lg">
                    <Text className="text-lg font-bold">Question 3</Text>
                    <Text className="text-sm">What is your marital status?</Text>
                    <View className="my-2 mx-5">
                        <DropDownPicker
                            open={maritalStatusPickerOpen}
                            value={maritalStatus}
                            items={maritalStatusOptions}
                            setOpen={setMaritalStatusPickerOpen}
                            setValue={setMaritalStatus}
                            setItems={setMaritalStatusOptions}
                        />
                    </View>
                </View>
                <View className="bg-white mx-4 my-2 p-2 rounded-lg items-center shadow-lg">
                    <Text className="text-lg font-bold">Question 4</Text>
                    <Text className="text-sm">What is your work status?</Text>
                    <View className="my-2 mx-5">
                        <DropDownPicker
                            open={workStatusPickerOpen}
                            value={workStatus}
                            items={workStatusOptions}
                            setOpen={setWorkStatusPickerOpen}
                            setValue={setWorkStatus}
                            setItems={setWorkStatusOptions}
                        />
                    </View>
                </View>
                <View className="bg-white mx-4 my-2 p-2 rounded-lg items-center shadow-lg">
                    <Text className="text-lg font-bold">Question 5</Text>
                    <Text className="text-sm">What is your annual income in GBP?</Text>
                    <TextInput
                        className="m-1 border border-gray-400 rounded-lg p-2"
                        keyboardType="numeric"
                        placeholder="e.g. 30000"
                        value={income}
                        onChangeText={setIncome}
                    />
                </View>
                <View className="bg-white mx-4 my-2 p-2 rounded-lg items-center shadow-lg">
                    <Text className="text-lg font-bold">Question 6</Text>
                    <Text className="text-sm">How would you rate your knowledge of personal finance (1-10)?</Text>
                    <Text>1 = Not at all knowledgeable, 10 = Very knowledgeable</Text>
                    <TextInput
                        className="m-1 border border-gray-400 rounded-lg p-2"
                        keyboardType="numeric"
                        placeholder="e.g. 7"
                        value={personalFinanceKnowledge}
                        onChangeText={setPersonalFinanceKnowledge}
                    />
                </View>

                <View className="bg-white mx-4 my-2 p-2 rounded-lg items-center shadow-lg">
                    <Text className="text-lg font-bold">Question 7</Text>
                    <Text className="text-sm">Do you think it is a good idea for people to buy things on credit?</Text>
                    <View className="my-2 mx-5">
                        <DropDownPicker
                            open={attitudeToBorrowingPickerOpen}
                            value={attitudeToBorrowing}
                            items={attitudeToBorrowingOptions}
                            setOpen={setAttitudeToBorrowingPickerOpen}
                            setValue={setAttitudeToBorrowing}
                            setItems={setAttitudeToBorrowingOptions}
                        />
                    </View>
                </View>
                <TouchableOpacity className="bg-white mx-auto my-2 p-2 rounded-lg items-center shadow-lg"
                onPress={onSubmit}>
                    <Text className="font-bold">Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
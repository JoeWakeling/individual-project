// noinspection JSUnusedGlobalSymbols

import "react-native-gesture-handler";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native";
import {BottomTabNavigationOptions, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ComponentType, useEffect, useState} from "react";
import {Text} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import {User} from "@firebase/auth";
import {auth} from "./firebase.config";
import Authentication from "./screens/Authentication/Authentication";
import Home from "./screens/Home/Home";
import Insights from "./screens/Insights/Insights";
import Invest from "./screens/Invest/Invest";
import Markets from "./screens/Markets/Markets";
import More from "./screens/More/More";
import InstrumentDetails from "./screens/Markets/InstrumentDetails/InstrumentDetails";

const AppTabs = createBottomTabNavigator();
const ScreenStack = createNativeStackNavigator();

export default function App() {
    // State for authentication status
    const [user, setUser] = useState<User | null>(null);
    // Hook to listen for authentication state changes
    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setUser(user); // Update user state when authentication state changes
        });
    }, []);

    // If no user is signed in, show authentication screen
    if (!user) {
        return <Authentication/>;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <AppTabs.Navigator screenOptions={({route}) => getTabBarOptions(route)}>
                    <AppTabs.Screen name="HomeStack">
                        {() => createStack([{name: "Home", component: Home}])}
                    </AppTabs.Screen>

                    <AppTabs.Screen name="InsightsStack">
                        {() => createStack([{name: "Insights", component: Insights}])}
                    </AppTabs.Screen>

                    <AppTabs.Screen name="InvestStack">
                        {() => createStack([{name: "Invest", component: Invest}])}
                    </AppTabs.Screen>

                    <AppTabs.Screen name="MarketsStack">
                        {() => createStack([
                            {name: "Markets", component: Markets},
                            {name: "InstrumentDetails", component: InstrumentDetails}
                        ])}
                    </AppTabs.Screen>

                    <AppTabs.Screen name="MoreStack">
                        {() => createStack([{name: "More", component: More}])}
                    </AppTabs.Screen>
                </AppTabs.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

const createStack = (screens: { name: string, component: ComponentType<any> }[], options?: any) => (
    <ScreenStack.Navigator {...options}>
        {screens.map(screen => (
            <ScreenStack.Screen key={screen.name} name={screen.name} component={screen.component}/>
        ))}
    </ScreenStack.Navigator>
);

const getTabBarOptions = (route: any): BottomTabNavigationOptions => {
    return {
        tabBarIcon: ({focused, color, size}) => {
            switch (route.name) {
                case "HomeStack":
                    return <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color}/>;
                case "InsightsStack":
                    return <Feather name="pie-chart" size={size - 2} color={color}/>;
                case "InvestStack":
                    return <Ionicons name={focused ? "bulb" : "bulb-outline"} size={size + 2} color={color}/>;
                case "MarketsStack":
                    return <Ionicons name={focused ? "analytics" : "analytics-outline"} size={size + 2} color={color}/>;
                case "MoreStack":
                    return <Feather name="more-horizontal" size={size + 2} color={color}/>;
                default:
                    return <Ionicons name={"help"} size={size} color={color}/>;
            }
        },
        tabBarLabel: () => {
            return <Text className="text-xs">{route.name.replace(/Stack$/, "")}</Text>;
        },
        headerShown: false,
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
    };
};
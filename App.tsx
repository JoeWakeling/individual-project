// noinspection JSUnusedGlobalSymbols
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Feather, Ionicons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {User} from "@firebase/auth";
import {auth} from "./firebase.config";
import Home from "./screens/Home/Home";
import Markets from "./screens/Markets/Markets";
import Invest from "./screens/Invest/Invest";
import More from "./screens/More/More";
import Insights from "./screens/Insights/Insights";
import Authentication from "./screens/Authentication/Authentication";

type AppTabParamList = {
    Home: undefined;
    Insights: undefined;
    Invest: undefined;
    Markets: undefined;
    More: undefined;
};

const AppTab = createBottomTabNavigator<AppTabParamList>();

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
        <NavigationContainer>
            <AppTab.Navigator
                screenOptions={({route: screen}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        if (screen.name === "Home") {
                            return <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color}/>;
                        } else if (screen.name === "Insights") {
                            return <Feather name="pie-chart" size={size-2} color={color}/>;
                        } else if (screen.name === "Invest") {
                            return <Ionicons name={focused ? "bulb" : "bulb-outline"} size={size+2} color={color}/>;
                        } else if (screen.name === "Markets") {
                            return <Ionicons name={focused ? "analytics" : "analytics-outline"} size={size+2} color={color}/>;
                        } else if (screen.name === "More") {
                            return <Feather name="more-horizontal" size={size+2} color={color}/>;
                        } else {
                            return <Ionicons name={"help"} size={size} color={color}/>; // Contingency, should never happen
                        }
                    },
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "gray",
                })}
            >
                <AppTab.Screen name="Home" component={Home}/>
                <AppTab.Screen name="Insights" component={Insights}/>
                <AppTab.Screen name="Invest" component={Invest}/>
                <AppTab.Screen name="Markets" component={Markets}/>
                <AppTab.Screen name="More" component={More}/>
            </AppTab.Navigator>
        </NavigationContainer>
    );
};

// noinspection JSUnusedGlobalSymbols

import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons, Feather} from "@expo/vector-icons";
import Home from "./routes/Home/Home";
import Markets from "./routes/Markets/Markets";
import Invest from "./routes/Invest/Invest";
import More from "./routes/More/More";
import Placeholder from "./routes/Placeholder/Placeholder";

type AppTabParamList = {
    Home: undefined;
    Markets: undefined;
    Invest: undefined;
    Placeholder: undefined;
    More: undefined;
};

const AppTab = createBottomTabNavigator<AppTabParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <AppTab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        if (route.name === "Home") {
                            return <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color}/>;
                        } else if (route.name === "Markets") {
                            return <Ionicons name={focused ? "analytics" : "analytics-outline"} size={size} color={color}/>;
                        } else if (route.name === "Invest") {
                            return <Ionicons name={focused ? "bulb" : "bulb-outline"} size={size} color={color}/>;
                        } else if (route.name === "Placeholder") {
                            return <Ionicons name={focused ? "document" : "document-outline"} size={size} color={color}/>;
                        } else if (route.name === "More") {
                            return <Feather name="more-horizontal" size={size} color={color}/>;
                        } else {
                            return <Ionicons name={"help"} size={size} color={color}/>; // Contingency, should never happen
                        }
                    },
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "gray",
                })}
            >
                <AppTab.Screen name="Home" component={Home}/>
                <AppTab.Screen name="Markets" component={Markets}/>
                <AppTab.Screen name="Invest" component={Invest}/>
                <AppTab.Screen name="Placeholder" component={Placeholder}/>
                <AppTab.Screen name="More" component={More}/>
            </AppTab.Navigator>
        </NavigationContainer>
    )
        ;
};

/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  AlbumScreen,
  ArtistScreen,
  ExpoloreScreen,
  PlayerScreen,
  SearchScreen,
  ProfileScreen,
} from "../screens"
import { getTabBarIcon, navigationRef } from "./navigation-utilities"
import { moderateScale, scaleByDeviceWidth } from "../theme/dimensionUtils"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type TabsNavigatorParamList = {
  explore: undefined
  search: undefined
  profile: undefined
}

export type NavigatorParamList = {
  primaryStack: undefined
  player: { trackId?: any }
  artist: { artistId?: any }
  album: { artistId?: any; albumId?: any }
}

// tabs navigation
const Tabs = createBottomTabNavigator<TabsNavigatorParamList>()

const TabsNav = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        height: scaleByDeviceWidth(75),
        paddingBottom: scaleByDeviceWidth(8),
        backgroundColor: "#46454B",
      },
      tabBarLabelStyle: { fontSize: moderateScale(15) },
      tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route.name),
      headerShown: false,
      headerShadowVisible: false,
      tabBarInactiveTintColor: "#A3A2A5",
      tabBarActiveTintColor: "#dc8eeb",
      tabBarHideOnKeyboard: true,
    })}
    initialRouteName={"explore"}
  >
    <Tabs.Screen name="explore" component={ExpoloreScreen} />
    <Tabs.Screen name="search" component={SearchScreen} />
    <Tabs.Screen name="profile" component={ProfileScreen} />
  </Tabs.Navigator>
)

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        orientation: "portrait",
        headerShown: false,
      }}
      defaultScreenOptions={{
        orientation: "portrait",
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName={"primaryStack"}
    >
      <Stack.Screen
        name="primaryStack"
        component={TabsNav}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          presentation: "modal",
          animation: "slide_from_left",
          gestureEnabled: true,
          statusBarAnimation: "slide",
          animationTypeForReplace: "push",
        }}
        name="player"
        component={PlayerScreen}
      />
      <Stack.Screen
        options={{
          presentation: "modal",
          animation: "slide_from_left",
          gestureEnabled: true,
          statusBarAnimation: "slide",
          animationTypeForReplace: "push",
        }}
        name="artist"
        component={ArtistScreen}
      />
      <Stack.Screen
        options={{
          presentation: "modal",
          animation: "slide_from_left",
          gestureEnabled: true,
          statusBarAnimation: "slide",
          animationTypeForReplace: "push",
        }}
        name="album"
        component={AlbumScreen}
      />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)

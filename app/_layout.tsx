import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "./authContext";
import React, { useEffect } from 'react';

function RootLayout() {

  const router = useRouter();

  // GET LOG-IN STATUS
  const { isLoggedIn } = useAuth();

  // REDIRECT BASED ON LOGIN STATUS
  useEffect(() => {

    if (!isLoggedIn) {
      // If not logged in => Login 1st
      router.replace("./login");
    } else {
      // If logged in => Index
      router.replace("/");
    }
  }, [isLoggedIn]);

  return (
    // <View style={{ flex: 1 }}>
    //   <Tabs>
    //     <Tabs.Screen name="index" options={{
    //       title: 'Home',
    //       tabBarIcon: ({ focused }) => (
    //         <TabBarIcon name='camera' color={focused ? 'blue' : 'grey'} />
    //       ),
    //     }} />
    //     <Tabs.Screen name="quiz" options={{
    //       title: 'Quiz',
    //       tabBarIcon: ({ focused }) => (
    //         <TabBarIcon name='list' color={focused ? 'blue' : 'grey'} />
    //       ),
    //     }} />
    //     <Tabs.Screen name="highScore" options={{
    //       title: 'High Score',
    //       tabBarIcon: ({ focused }) => (
    //         <TabBarIcon name='list' color={focused ? 'blue' : 'grey'} />
    //       ),
    //     }} />

    //     {/* <Tabs.Screen name="login" options={{
    //       title: 'Log Out',
    //       tabBarIcon: ({ focused }) => (
    //         <TabBarIcon name='book' color={focused ? 'blue' : 'grey'} />
    //       ),
    //     }} /> */}

    //     <Button
    //       title="Logout"
    //       onPress={() => doLogout()}
    //     />
    //   </Tabs>

    //   <View style={{ padding: 20 }}>
    //     <Button
    //       title="Logout"
    //       onPress={() => doLogout()}
    //     />
    //   </View>

    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="quiz" options={{ headerShown: false }} />
      <Stack.Screen name="gameScreen" options={{ title: "Game" }} />
      <Stack.Screen name="highScore" options={{ title: "All Time High Scores" }} />
      <Stack.Screen name="animationW6" options={{ headerShown: false }} />
    </Stack>
    // </View>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}

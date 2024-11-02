export const initial = `// No import react o react native, use RN.Component, React.useState or useState
const Stack = ReactNavigationStack.createNativeStackNavigator();
const App = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    // <ReactNativeAuth0.Auth0Provider
    //   domain={env.key}
    //   clientId={env.key}
    // >
      <NativeBase.NativeBaseProvider>
        <ThemeProvider
          value={
            colorScheme === "dark"
              ? ReactNavigation.DarkTheme
              : ReactNavigation.DefaultTheme
          }
        >
          <Stack.Navigator
            initialRouteName="/feed"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="feed" component={Home} />
          </Stack.Navigator>
        </ThemeProvider>
      </NativeBase.NativeBaseProvider>
    // </ReactNativeAuth0.Auth0Provider>
  );
};

const Home=()=>{
return <RN.Text>Hola mundo</RN.Text>
}
`
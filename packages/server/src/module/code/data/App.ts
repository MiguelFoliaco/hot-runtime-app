export const app = `
    const App=()=>{
    return React.createElement(RN.Text, null, "No hay versiones disponibles")
}`

// <RN.Button title='Change Value' onPress={()=>updateState("name", "Miguel")} />
// <RN.TextInput value={states?.name} onChange={(e) => updateState("name",e.nativeEvent.text)} />

export const template = (code: string) => {
    return/* React */ `return function(){
        ${code}

        return App
        }`
}

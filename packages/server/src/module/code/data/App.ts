export const app = `
    const App=()=>{
    const [texto, setTexto] = useState('Hola mundo')
    return <RN.View>
    <RN.Text>Text in view {texto}</RN.Text>
    <RN.Button title='Change Name' onPress={()=>setTexto("Cambio el texto")}  />
    </RN.View>
    }`

// <RN.Button title='Change Value' onPress={()=>updateState("name", "Miguel")} />
// <RN.TextInput value={states?.name} onChange={(e) => updateState("name",e.nativeEvent.text)} />

export const template = (code: string) => {
    return/* React */ `return function(){
        ${code}

        return App
        }`
}

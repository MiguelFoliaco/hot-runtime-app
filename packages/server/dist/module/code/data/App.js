"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.app = void 0;
exports.app = `
    const App=()=>{
    return React.createElement(RN.Text, null, "No hay versiones disponibles")
}`;
// <RN.Button title='Change Value' onPress={()=>updateState("name", "Miguel")} />
// <RN.TextInput value={states?.name} onChange={(e) => updateState("name",e.nativeEvent.text)} />
const template = (code) => {
    return /* React */ `return function(){
        ${code}

        return App
        }`;
};
exports.template = template;

import { Editor } from "@monaco-editor/react"
import { Button, Grid, TextField } from "@mui/material"
import { useState } from "react"
import { replaceData } from "../../utils/replaceData"
import { useLocalStorage } from "../../utils/hooks/useLocalStorage"




const reactCode = `function \${name} () {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }`


// const activateMonacoJSXHighlighter = async (monacoEditor: EditorProps, monaco: Monaco) => {
//     const { default: traverse } = await import('@babel/traverse')
//     const { default: MonacoJSXHighlighter } = await import(
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         //@ts-ignore
//         'monaco-jsx-highlighter'
//     )

//     const babelParse = (code: string) => parse(code, {
//         sourceType: "module",
//         plugins: ["jsx", "typescript"],
//         strictMode: false,
//         errorRecovery: true
//     });

//     const monacoJSXHighlighter = new MonacoJSXHighlighter(
//         monaco,
//         babelParse,
//         traverse,
//         monacoEditor,
//     )

//     monacoJSXHighlighter.highlightOnDidChangeModelContent()
//     monacoJSXHighlighter.addJSXCommentCommand()

//     return {
//         monacoJSXHighlighter,
//     }
// }


export const Builder = () => {


    // const monaco = useMonaco()
    const [value, setValue] = useState(reactCode)

    const [nameComponent, setNameComponent] = useState('Any Name')
    const localStorageComponent = useLocalStorage<{ name: string, code: string }[]>('LIST-COMPONENTS', [])
    const saveCodeInLocal = () => {
        localStorageComponent.setItemValue(localStorageComponent.current.concat({
            name: nameComponent,
            code: value
        }))
        setValue(reactCode)
        setNameComponent('Any Name')
    }

    // useEffect(() => {
    //     if (monaco) {
    //         monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    //             "target": 7,
    //             "useDefineForClassFields": true,
    //             "lib": ["ES2020", "DOM", "DOM.Iterable"],
    //             "module": 99,
    //             "skipLibCheck": true,

    //             /* Bundler mode */
    //             "moduleResolution": 1,
    //             "allowImportingTsExtensions": true,
    //             "isolatedModules": true,
    //             "moduleDetection": "force",
    //             "noEmit": true,
    //             "jsx": 4,

    //             /* Linting */
    //             "strict": true,
    //             "noUnusedLocals": true,
    //             "noUnusedParameters": true,
    //             "noFallthroughCasesInSwitch": true
    //         })
    //         const model = monaco.editor.createModel("console.log('hello,world')");
    //         monaco.editor.setModelLanguage(model, "typescript");
    //     }
    // }, [monaco])

    // const handleEditorDidMount = useCallback(async (editor: , monaco: Monaco) => {

    //     monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    //         "target": 7,
    //         "useDefineForClassFields": true,
    //         "lib": ["ES2020", "DOM", "DOM.Iterable"],
    //         "module": 99,
    //         "skipLibCheck": true,

    //         /* Bundler mode */
    //         "moduleResolution": 1,
    //         "allowImportingTsExtensions": true,
    //         "isolatedModules": true,
    //         "moduleDetection": "force",
    //         "noEmit": true,
    //         "jsx": 4,

    //         /* Linting */
    //         "strict": true,
    //         "noUnusedLocals": true,
    //         "noUnusedParameters": true,
    //         "noFallthroughCasesInSwitch": true
    //     })
    // }, [])

    return (
        <Grid container sx={{}}>
            <Grid item xs={12} sx={{ p: 1 }}>
                <TextField value={nameComponent} onChange={(e) => {
                    setNameComponent(e.target.value)
                    setValue(replaceData(reactCode, { name: e.target.value.replaceAll(' ', '_') }))
                }} size='small' placeholder='Nombre del componente' sx={{ width: '40%' }} />
            </Grid>
            <Grid item xs={12} sx={{ height: '80%' }}>
                <Editor
                    value={value}
                    theme="vs-dark"
                    language="javascript"
                    // onMount={(editor, monaco) => handleEditorDidMount(editor, monaco)}
                    onChange={(val) => setValue(val || '')}

                />
            </Grid>
            <Grid item xs={12} sx={{ p: 1 }}>
                <Button onClick={saveCodeInLocal} size='small' fullWidth variant='outlined'>Guardar</Button>
            </Grid>
        </Grid>
    )
}

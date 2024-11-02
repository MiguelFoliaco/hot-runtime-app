import { Tables } from "../../../database.types"

export const getTypeComponentByText = (code: string): Tables<'components'>['type'] => {
    const text = code.replaceAll(' ', '')
    const isJSXCheckOne = `return<`
    const isJSXCheckTwo = `return<>`
    const isJSXCheckThree = `=<>`
    const isJSXCheckFourt = `=><>`
    const isJSXCheckFive = `return(<`

    if (text.includes(isJSXCheckOne) || text.includes(isJSXCheckTwo) || text.includes(isJSXCheckThree) || text.includes(isJSXCheckFourt) ||  text.replaceAll('\n', '').includes(isJSXCheckFive)) {
        return 'component'
    }

    else if (text.includes('constuse') || text.includes('functionuse')) {
        return 'hooks'
    }
    else {
        return 'function'
    }
}

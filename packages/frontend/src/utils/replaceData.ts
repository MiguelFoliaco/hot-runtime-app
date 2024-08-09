import { getDataByPath } from "./getDataByPath";

/**
 * 
 * @param text 'Hola soy ${name}'
 * @param params {name: 'Juan'}
 * @returns Hola soy Juan
 * @author Miguel Angel Foliaco
 */
export const replaceData = (
    text: string = "",
    params: Record<string, boolean | number | string | null | object>
) => {
    let texto = text.concat();
    const expReg = /\${(.*?)}/g;
    let val = texto.match(expReg) as string[];
    const valSet = new Set(val);
    val = Array.from(valSet);
    val.forEach((e) => {
        const key = e.replace("${", "").replace("}", "");
        texto = texto.replaceAll(e, String(getDataByPath(key, params) || ""));
    });

    return texto;
};
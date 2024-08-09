/**
 * 
 * @param path @type string
 * @param data @type object
 * @example const data= getDataByPath<string>('user.name', {user:{name:'juan'}})
 * console.log(data) //output 'juan'
 * @returns 
 * @author Miguel Angel Foliaco
 */
export const getDataByPath = <T = string, U = unknown>(path: string, data: U | T): T | undefined => {
    if (path === '.') return data as T;
    const _path = (path.replaceAll('[', '.').replaceAll(']', '.')).split('.');
    let obj: U | T = data;
    try {
        _path.forEach(e => {
            let key = e;
            if (e.includes('($)')) {
                key = key.replaceAll('($)', '.')
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            obj = obj[key];
        })
        return obj as T;
    }
    catch (err: unknown) {
        console.log(err)
        return undefined;
    }

}
type MapMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'
export function Get(path: `${MapMethods} /${string}`): MethodDecorator {
    //@ts-ignore
    return function (...args) {
        return function (...args2: number[]) {
            console.log(path)
            console.log("ARGS1", args,)
            console.log("ARGS2", args2,)
            return {}
        }
    }
}
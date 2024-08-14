/* eslint-disable @typescript-eslint/ban-ts-comment */
export type TypesValidation =
  | 'string'
  | 'date'
  | 'object'
  | 'array'
  | 'number'
  | 'boolean'

export function verify<T>(
  data: unknown,
  validation: Partial<Record<keyof T, TypesValidation>>,
  strict = false
) {
  const errors: Array<{ errors: string }> = []
  // @ts-ignore
  const _keys = Object.keys(validation)

  for (const key of _keys) {
    // @ts-ignore
    if (data[key] === undefined && strict) {
      errors.push({ errors: `propertie ${key} is not undefined` })
      break
    }

    // @ts-ignore
    if (validation[key] === 'date') {
      // @ts-ignore
      const date = new Date(data[key] as string)

      if (date.toString() === 'Invalid Date') {
        errors.push({
          // @ts-ignore
          errors: `propertie ${key} is not type ${validation[key]}`,
        })
        break
      }
    }

    // @ts-ignore
    else if (validation[key] === 'array') {
      // @ts-ignore
      if (!data[key]?.length) {
        errors.push({
          // @ts-ignore
          errors: `propertie ${key} is not type ${validation[key]}`,
        })
        break
      }
    }

    // @ts-ignore
    else if (typeof data[key] !== validation[key]) {
      errors.push({
        // @ts-ignore
        errors: `propertie ${key} is not type ${validation[key]}`,
      })
      break
    }
  }

  return {message: 'propertie type invalid',errors}
}

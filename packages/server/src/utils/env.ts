import { config } from 'dotenv'
config()
export const env = (key: string): string | undefined => {
    return process.env[key]
}
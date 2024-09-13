import { SupabaseClient, } from "@supabase/supabase-js";
import { generateTokenPayload } from "./types/generateTokenPayload";
import { sign } from 'jsonwebtoken'
import { Database } from "../../database.types";
import { env } from "../../utils";
export class AuthServices {
    constructor(private client: SupabaseClient<Database, 'public'>) { }

    generateToken = async (payload: generateTokenPayload) => {
        const actions = await this.client.from('actions').select().in("id", payload.rol.actions)
        if (actions.error) {
            return actions.error
        }

        const token_save = await this.client.from('tokens_dev').insert({
            assing_by: payload.user.email || '',
            show: false,
            title: payload.title,
            create_by: payload.user.id
        }).select('*')
        if (token_save.data) {
            const token = sign({
                actions: actions.data.map(e => e.code),
                userId: payload.user.id,
                username: payload.user.email,
                tokenID: token_save.data[0].id || 'non-id'
            }, env('JWT_KEY_CLIENT_generate') || 'secret-mi-perro', {
                expiresIn: payload.timeExpire === 0 ? undefined : payload.timeExpire,
            })
            return token;
        }
        return token_save.error
    }


    login = async ({ password, email }: { email: string, password: string }) => {
        const sign = await this.client.auth.signInWithPassword({
            email,
            password,
        })

        return sign;
    }

}

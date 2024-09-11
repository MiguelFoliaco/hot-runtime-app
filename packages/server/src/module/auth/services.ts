import { SupabaseClient } from "@supabase/supabase-js";
import { generateTokenPayload } from "./types/generateTokenPayload";
import { sign } from 'jsonwebtoken'
import { Database } from "../../database.types";
import { env } from "../../utils";
export class AuthServices {
    constructor(private client: SupabaseClient<Database, 'public'>) { }

    generateToken = async (payload: generateTokenPayload) => {
        const actions = await this.client.from('actions').select().filter("id", "in", payload.rol.actions)
        if (actions.error) {
            return actions.error
        }

        return sign({
            actions: actions.data.map(e => e.code),
            userId: payload.user.id,
            username: payload.user.email
        }, env('JWT_KEY_CLIENT_generate') || 'secret-mi-perro', {
            expiresIn: payload.timeExpire === 0 ? undefined : payload.timeExpire
        })
    }
}
import { User } from "@supabase/supabase-js";
import { Tables } from "../../../database.types";

export type generateTokenPayload = { user: User, rol: Tables<'rols'>, timeExpire: number };
import { PostgrestError, PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import esbuild from 'esbuild';
import { Database, Tables } from "../../database.types";

export class CodeServices {
    constructor(private client: SupabaseClient<Database, 'public'>) { }

    generateVersion = async (version: Tables<'version-code'>) => {
        try {
            const codeRequest = await this.client.from('components').select().eq("projectid", version.projectid)
            if (codeRequest.error) return {
                data: null,
                error: codeRequest.error
            };
            const codes = codeRequest.data.map(e => e.codeJSX);
            const codesUnion = codes.join('\n');
            const codebuild = await esbuild.transform(codesUnion, {
                jsx: 'transform',
                loader: 'tsx',
                minify: true
            });
            const requestInsert = await this.client.from('version-code').insert({
                os_id: version.os_id,
                projectid: version.projectid,
                available_production: version.available_production,
                available_test: version.available_test,
                code_build: codebuild.code,
                code_jsx: codesUnion,
                publicateBy: version.publicateBy,
                publicate_by_email: version.publicate_by_email,
                programing_date: version.programing_date,
                name: version.name || 'Without Name'
            })
            return requestInsert
        }
        catch (err) {
            type err = { msg: string }
            return {
                count: 0,
                data: null,
                error: String(err),
                status: 200,
                statusText: "Error en compilación"
            }
        }
    }
    getVersionByProject = async (projectId: number, os_id: number) => {
        return await this.client.from('version-code').select().eq('projectid', projectId).eq('os_id', os_id).eq('available_production', true).limit(1).order('programing_date', {
            ascending: false
        })
    }
}
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
            const codesUnion = codes.join('\n').replaceAll('export const', 'const');
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

    compile = async (codeJSX: string) => {
        const codebuild = await esbuild.transform(codeJSX, {
            jsx: 'transform',
            loader: 'tsx',
            minify: true
        });

        return codebuild;
    }

    createComponents = async (data: Tables<'components'>[], projectId: number) => {

        const components = await this.client.from('components').select().in('name', data.map(e => e.name)).eq('projectid', projectId)
        if (components.error === null) {
            //Update components
            const responses = data.map(e => {
                const item = components.data.find(el => el.name === e.name);
                if (item) {
                    return this.client.from('components').update({ ...e }).eq('id', item.id)
                }
                return this.client.from('components').insert(e)
            })

            return await Promise.all(responses)
        }
        return components.error
    }
}
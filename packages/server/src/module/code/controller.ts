import esbuild from 'esbuild'
import { IHandler } from "../../types";
import { app, template } from './data/App';

export class CodeController {

    getCode: IHandler = async (req, res) => {

        const codebuild = await esbuild.transform(app, {
            jsx: 'transform',
            loader: 'tsx',
        })

        res.header({
            'Content-Type': 'application/javascript'
        })

        return res.send(template(codebuild.code))
    }
}
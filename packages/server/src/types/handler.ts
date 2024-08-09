import { NextFunction, Request, Response } from "express";

export type IHandler = (req: Request, res: Response, next: NextFunction) => Promise<Response>
export type IHandlerSync = (req: Request, res: Response, next: NextFunction) => Response
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { BaseRpcExceptionFilter, Payload, RpcException } from "@nestjs/microservices";
import { response, Response } from "express";
import { RpcErrorPayload } from "./rpc.types";

@Catch()

export class RpcAllExceptionFilter extends BaseRpcExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        if (exception instanceof RpcException) {
            return super.catch(exception, host)
        }

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const hasGetStatus = exception != null && typeof exception === "object" && 'getStatus' in exception;
        if (hasGetStatus) {
            const status = (exception as any).getStatus?.()
            if (status === 400) {
                const payload: RpcErrorPayload = {
                    code: 'VALIDATION_ERROR',
                    message: 'validation failed ',
                    details: response
                }
                return super.catch(new RpcException(payload), host)
            }
        }
        const payload: RpcErrorPayload = {
            code: 'INTERNAL',
            message: 'internal error'
        }
        return super.catch(new RpcException(payload), host)
    }
}
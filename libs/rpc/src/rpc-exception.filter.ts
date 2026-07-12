import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { BaseRpcExceptionFilter, RpcException } from "@nestjs/microservices";
import { RpcErrorPayload } from "./rpc.types";

@Catch()
export class RpcAllExceptionFilter extends BaseRpcExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        if (exception instanceof RpcException) {
            return super.catch(exception, host)
        }

        if (exception instanceof HttpException) {
            const status = exception.getStatus()
            if (status === 400) {
                const res = exception.getResponse()
                const payload: RpcErrorPayload = {
                    code: 'VALIDATION_ERROR',
                    message: 'validation failed',
                    details: typeof res === 'string' ? res : res,
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
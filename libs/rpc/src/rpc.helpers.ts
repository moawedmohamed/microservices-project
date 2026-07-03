import { RpcException } from "@nestjs/microservices"
import { RpcErrorPayload } from "./rpc.types"

export const rpcBadRequest = (message: string, details?: unknown): never => {
    const payload: RpcErrorPayload = { code: 'BAD_REQUEST', message, details }
    throw new RpcException(payload);
}
export const rpcNotFound = (message: string, details?: unknown): never => {
    const payload: RpcErrorPayload = { code: 'NOT_FOUND', message, details }
    throw new RpcException(payload);
}
export const rpcNotAuthorized = (message: string = 'UnAuthorized', details?: unknown): never => {
    const payload: RpcErrorPayload = { code: 'NOT_AUTHORIZED', message, details }
    throw new RpcException(payload);
}
export const rpcInternal = (message: 'Internal Error', details?: unknown): never => {
    const payload: RpcErrorPayload = { code: 'INTERNAL', message, details }
    throw new RpcException(payload);
}
export const rpcForbidden = (message: 'Forbidden', details?: unknown): never => {
    const payload: RpcErrorPayload = { code: 'FORBIDDEN', message, details }
    throw new RpcException(payload);
}

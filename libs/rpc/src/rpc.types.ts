export type RpcErrorCode =
    | 'BAD_REQUEST'
    | 'VALIDATION_ERROR'
    | 'NOT_FOUND'
    | 'NOT_AUTHORIZED'
    | 'FORBIDDEN'
    | 'INTERNAL'

export type RpcErrorPayload = {
    code: RpcErrorCode,
    message: string,
    details?: any
}
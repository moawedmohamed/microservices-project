/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BadRequestException, ForbiddenException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const mapRpcErrorToHttp = (err: any): never => {
    const payload = err?.error ?? err;
    const code = payload?.code as string | undefined
    const message = payload?.message ?? "Request Failed "
    if (code === 'BAD_REQUEST' || code === 'VALIDATION_ERROR') {
        throw new BadRequestException(message)
    }
    if (code === 'NOT_FOUND') {
        throw new NotFoundException(message)
    }
    if (code === 'NOT_AUTHORIZED') {
        throw new UnauthorizedException(message)
    }
    if (code === 'FORBIDDEN') {
        throw new ForbiddenException(message)
    }
    throw new InternalServerErrorException(message)
}
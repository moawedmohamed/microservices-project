import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserContext } from "./auth.types";
import { Request } from "supertest";

export const CurrentUser = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest<Request & { user: UserContext }>();
        return req.user
    }
)
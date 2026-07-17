import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CurrentUser } from "../auth/current-user.decorator";
import type { UserContext } from "../auth/auth.types";
import { mapRpcErrorToHttp } from "@app/rpc";
import { firstValueFrom } from "rxjs";
import { AdminOnly } from "../auth/admin.decorator";
import { Public } from "../auth/public.decorator";

type Product = {
    _id: string,
    name: string,
    description: string,
    price: number,
    status: 'DRAFT' | 'ACTIVE',
    imageUrl?: string | undefined,
    createdByClerkUserId: string
}

@Controller()
export class ProductsHttpController {
    constructor(
        // getaway talks to the catalog via RMQ client 
        @Inject('CATALOG_CLIENT') private readonly catalogClient: ClientProxy
    ) { }
    @Post('products')
    @AdminOnly()
    async createProduct
        (@CurrentUser() user: UserContext,
            @Body() body: {
                name: string,
                description: string,
                price: number,
                status?: string,
                imageUrl?: string
            }
        ): Promise<Product> {
        const payload = {
            name: body.name,
            description: body.description,
            price: Number(body.price),
            status: body.status,
            imageUrl: '', 
            createdByClerkUserId: user.clerkUserId
        }
        try {
            return await firstValueFrom(
                this.catalogClient.send<Product>('product.create', payload)
            )
        } catch (error) {
            mapRpcErrorToHttp(error);
            throw error
        }
    }
    @Get('product')
    async listProducts(): Promise<Product[]> {
        try {
            return await firstValueFrom(
                this.catalogClient.send<Product[]>('product.list', {})
            )
        } catch (error) {
            mapRpcErrorToHttp(error);
            throw error
        }
    }

    @Get()
    @Public()
    async getProductById(@Param() id: string): Promise<Product> {
        try {
            return await firstValueFrom(this.catalogClient.send<Product>('product.getById', { id }))
        } catch (error) {
            mapRpcErrorToHttp(error)
            throw error
        }
    }


}

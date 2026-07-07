import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CurrentUser } from "../auth/current-user.decorator";
import type { UserContext } from "../auth/auth.types";
import { mapRpcErrorToHttp } from "@app/rpc";
import { firstValueFrom } from "rxjs";

type Product = {
    _id: string,
    name: string,
    description: string,
    price: number,
    status?: 'DRAFT' | 'ACTIVE',
    imageUrl?: string | undefined,
    createdByClerkUserId: string | undefined
}

@Controller()
export class ProductsHttpController {
    constructor(
        // getaway talks to the catalog via RMQ client 
        @Inject('CATALOG_CLIENT') private readonly catalogClient: ClientProxy
    ) { }

    @Post('products')
    async createProduct
        (@CurrentUser() user: UserContext,
            @Body() body: {
                name: string,
                description: string,
                price: number,
                status?: string,
                imageUrl?: string
            }
        ) {
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
            mapRpcErrorToHttp(error)
        }
    }
}
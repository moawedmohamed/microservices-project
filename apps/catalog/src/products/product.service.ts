import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./prodcut.schema";
import { isValidObjectId, Model } from "mongoose";
import { CreateProductDto } from "./dtos/product.dto";
import { rpcBadRequest, rpcNotFound } from "@app/rpc";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel
            (Product.name) private readonly productModel: Model<ProductDocument>
    ) { }

    public async createNewProduct(input: CreateProductDto) {
        if (!input.name || !input.description) {
            rpcBadRequest('name and description are required')
        }
        if (typeof input.price !== 'number'
            || Number.isNaN(input.price)
            || input.price < 0) {
            rpcBadRequest('price must me valid number and >=0')
        }
        if (input.status && input.status !== 'DRAFT' && input.status != 'ACTIVE')
            rpcBadRequest('Status must be either active or ')

        const newlyCreatedProduct = await this.productModel.create({
            name: input.name,
            description: input.description,
            price: input.price,
            status: input.status ?? 'DRAFT',
            imageUrl: input.imageUrl,
            createdByClerkUserId: input.createdClerkUserId
        })
        return newlyCreatedProduct
    }

    public async listProducts() {
        return this.productModel.find().sort({ createdAt: -1 }).exec()
    }

    public async getProductById(input: { id: string }) {
        if (!isValidObjectId(input.id))
            rpcBadRequest('invalid product id')

        const product = await this.productModel.findById(input.id)
        if (!product) {
            rpcNotFound('product is not present in the db ')
        }
        return product;
    }
}
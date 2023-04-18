import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductsService{
    products:Product[] = [];

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>
    ) {}

    async insertProduct(title: string, desc: string, price: Number){
        const newProduct = new this.productModel({
            title,
            description: desc,
            price
        });
        const result = await newProduct.save();
        return result._id.toString() as string;
    }

    async getProducts(){
        const products = await this.productModel.find().exec();
        // return products as Product[];
        return products.map((prod) => ({id: prod._id, title: prod.title, description: prod.description, price: prod.price}));
    }

    async getSingleProduct(productId: any){
        const product = await this.findProduct(productId);
        // return {id: product._id, title: product.title, description: product.description, price: product.price};
        return product;
    }

    async updateProduct(productId: string,title: string, desc: string, price: Number){
        const updateProduct = await this.findProduct(productId);
        if(title){
            updateProduct.title = title;
        }
        if(desc){
            updateProduct.description = desc;
        }
        if(price){
            updateProduct.price = price;
        }
        await updateProduct.save();
    }

    async deleteProduct(productId: string){
        const result = await this.productModel.deleteOne({_id:productId}).exec();
        console.log(result);
        if(result.deletedCount == 0){
            throw new NotFoundException('Could not find product');
        }
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try{
            product = await this.productModel.findById(id);
        } catch(err){
            throw new NotFoundException('Could not find product');
        }
        // if !null
        if(!product){
            throw new NotFoundException('Could not find product');
        }
        // return {id: product._id, title: product.title, description: product.description, price: product.price};
        return product;
    }
}
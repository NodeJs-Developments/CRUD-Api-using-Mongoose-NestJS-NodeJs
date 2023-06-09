import { Body, Controller, Get, Post, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductController {

    constructor(private readonly productsService: ProductsService){}

    @Post()
    async addProduct
        (@Body('title') prodTitle: string, 
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
        ): Promise<any> {
        const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedId};
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products;
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string){
        return await this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ){
        await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string){
        await this.productsService.deleteProduct(prodId);
        return null;
    }
}
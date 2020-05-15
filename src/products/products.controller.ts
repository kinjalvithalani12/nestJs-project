import { Controller, Get, Post, Body, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')

export class ProductsController {

    constructor(private readonly productsService: ProductsService){

    }

    @Post() 
    addNewProduct(@Body() data : any [] ) {
        return this.productsService.addNewProduct(data);
    }

    @Get()
    getAllProduct() {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getProduct(@Param('id') id: string) {
        return this.productsService.getProduct(id);
    }

    @Patch(':id')
    updateProduct(@Param('id') id: string, @Body() data : any []) {
        return this.productsService.updateProduct(id, data);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }

}
import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { stringify } from "querystring";

@Injectable()

export class ProductsService {
    products: Product[] = [];
    constructor() {

    }

    addNewProduct(data: any = []) {
        const id = Math.random().toString();
        const newProduct = new Product(id, data.title, data.description, data.price)
        this.products.push(newProduct);
        return id;
    }

    getAllProducts() {
        return [...[this.products]]
    }

    getProduct(productId) {
        const product = this.findProduct(productId)[0];
        return {...product};
    }

    updateProduct(id: string, data: any = []) {
        const [product, index] = this.findProduct(id);
        const updateProduct = {...product};
        if (data.title) {
            updateProduct.title = data.title;
        }
        if (data.description) {
            updateProduct.description = data.description;
        }
        if (data.price) {
            updateProduct.price = data.price;
        }
        this.products[index] = updateProduct;
        return null;
    }

    deleteProduct(id: string) {
        const [product, index] = this.findProduct(id);
        this.products.splice(index, 1);
        return null;
    }

    private findProduct(productId): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === productId);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Product Not Found');
        }
        return [product, productIndex];
    }
}
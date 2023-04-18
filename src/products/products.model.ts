import * as mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
})


export interface Product extends mongoose.Document {
    id: string,
    title: string,
    description: string,
    price: Number
}

/* export class Product {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public price: Number
    ) {}
} */


/* export class Product {
    id: string;
    title: string;
    description: string;
    price: Number;

    constructor(id: string, title: string, description: string, price: Number){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
    }
} */
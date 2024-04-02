import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true },
    category: { type: String, required: true, index: true },
    thumbnails: { type: Array, default: [] },
    owner: { type: String, default: 'admin' },
    createdBy: { type: String }
});

productSchema.plugin(mongoosePaginate)


export const ProductModel = mongoose.model('products', productSchema);

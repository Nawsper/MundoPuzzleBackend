import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true, max: 100, unique: true },
    purchase_datetime: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true, max: 100 },
    items: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],
        required: true,
    },
});

export const TicketModel = mongoose.model('tickets', ticketSchema);
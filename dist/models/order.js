"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    items: {
        type: [
            {
                id: {
                    type: Number,
                    required: true,
                },
                title: {
                    type: String,
                    required: true,
                },
                coinPriceUSD: {
                    type: Number,
                    required: true,
                },
                coinPriceARS: {
                    type: Number,
                    required: true,
                },
                subTotal: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                img: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
    total: {
        type: Number,
        default: 0,
        required: true,
    },
});
const Order = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = Order;

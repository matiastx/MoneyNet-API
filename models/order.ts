import {Model, Schema, Types, model} from "mongoose";

interface IItem {
  id: number;
  title: string;
  coinPriceUSD: number;
  coinPriceARS: number;
  quantity: number;
  subTotal: number;
  img: string;
}

export interface IOrder {
  createdAt: Date;
  user: Types.ObjectId;
  items: IItem[];
  status: string;
  total: number;
}

const OrderSchema = new Schema<IOrder>({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
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

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order;
import { Request, Response } from 'express';
import Order, {IOrder} from '../models/order'
import { ObjectId } from 'mongoose';



export const getOrders = async (req: Request, res: Response): Promise<void> => {
  const userID: ObjectId = req.body.confirmedUser._id;

  const consulta = {user: userID};

  const orders = await Order.find(consulta);

  res.json({
    data: [...orders]
  })

}

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const userID: ObjectId = req.body.confirmedUser._id;
  const orderData: IOrder = req.body;

  const data = {
    ...orderData,
    user: userID,
    createdAt: new Date(),
    status: "pending"
  }

  const order = new Order(data);
  await order.save();

  res.status(201).json({
    data: order
  })
}

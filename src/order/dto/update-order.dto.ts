import { OrderProduct } from "../schemas/order.schema";

export class UpdateOrderDto {
  readonly name: string;
  readonly phone: string;
  readonly description: string;
  readonly products: { quantity: number; product: OrderProduct }[];
}
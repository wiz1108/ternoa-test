import { model, Schema, Document } from 'mongoose';

interface IItem extends Document {
  itemName: string,
  itemAmount: number,
}

const ItemSchema: Schema = new Schema({
  itemName: String,
  itemAmount: Number,
})

const Item = model<IItem>('Items', ItemSchema);

export { Item, IItem }
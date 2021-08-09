import { Document, Model, model, Schema } from 'mongoose';

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  wishlist: Array
});

export const ClientModel: Model<ClientDocument> = model('Client', ClientSchema);

type ClientDocument = IClient & Document;

export interface IClient {
  name: string;
  email: string;
  wishlist?: any[];
}
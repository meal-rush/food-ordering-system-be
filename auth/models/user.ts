import mongoose, { Schema, Document } from 'mongoose';

interface Location {
  coordinates: [number, number];
}

interface Address {
  location: Location;
  deliveryAddress: string;
}

export interface User extends Document {
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  addresses: Address[];
}

const AddressSchema = new Schema<Address>({
  location: {
    coordinates: { type: [Number], required: true },
  },
  deliveryAddress: { type: String, required: true },
});

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  addresses: [AddressSchema],
});

export const UserModel = mongoose.model<User>('User', UserSchema);

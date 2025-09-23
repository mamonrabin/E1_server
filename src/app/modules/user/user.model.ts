import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /.+@.+\.com$/,
        'Please enter a valid email address with @ and .com',
      ],
    },
    password: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      match: [
        /^01\d{9}$/,
        'Phone number must be 11 digits and start with "01"',
      ],
    },
    address: { type: String },
    bio: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.methods.comparePassword = async function (inputPassword: string) {
  return await bcrypt.compare(inputPassword, this.password);
};

export const userModel = model<TUser>('user', userSchema);

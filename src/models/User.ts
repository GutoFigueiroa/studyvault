import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

// 1. Definição da Interface (TypeScript)
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
    _id: Types.ObjectId;
}

// 2. Definição do Schema (Mongoose)
const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

// 3. MIDDLEWARE: Hashing da Senha (antes de salvar)
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 4. Método de Comparação (para login)
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
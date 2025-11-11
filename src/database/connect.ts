// src/database/connect.ts
import mongoose from "mongoose";

export async function connectDB() {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("⚠️ Variável MONGODB_URI não definida no .env");
    }

    await mongoose.connect(mongoUri);
    console.log("✅ Conectado ao MongoDB Atlas com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Encerra a aplicação em caso de falha
  }
}

import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
  try {
    const dbURL = process.env.DBURL;
    if (!dbURL) {
      throw new Error("La URL de conexión no esta definida correctamente");
    }
    await mongoose.connect(dbURL);
    console.log("Base de datos en linea");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos");
  }
}

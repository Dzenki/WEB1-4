import mongoose from "mongoose";
import mssql from "mssql";
import sql from "mssql";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vlasovavarvara2004:Qwertyklava18*@cluster0.r9arn.mongodb.net/persona').then(()=>console.log("DB Connected"));
} 

const config = {
    user: 'LAPTOP-UBJNU2RK\\79636', // замените на ваше имя пользователя
    password: '', // замените на ваш пароль
    server: 'localhost', // например, 'localhost' или '192.168.1.1'
    database: 'persona_db', // замените на имя вашей базы данных
    options: {
        encrypt: true, // Используйте для Azure
        trustServerCertificate: true // Используйте для локальных тестов
    }
};

async function connectToDatabase() {
    try {
        let pool = await mssql.connect(config);
        console.log('Подключение к базе данных успешно!');
        return pool;
    } catch (err) {
        console.error('Ошибка подключения к базе данных:', err);
    }
}

export default connectToDatabase;

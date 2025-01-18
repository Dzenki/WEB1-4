import express from "express"
import cors from "cors"
//import { connectDB, connectToDatabase } from "./config/db.js"
import personaRouter from "./routes/personaRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import mongoose from "mongoose"
import sqlite3 from "sqlite3"
import multer from "multer"
import cartRouter from "./routes/cardRoute.js"
import responseRoute from "./routes/responseRoute.js"


//app config

const app = express()
const port = 4000

// middleware

app.use(express.json())
app.use(cors())

// mongodb connection

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vlasovavarvara2004:Qwertyklava18*@cluster0.r9arn.mongodb.net/persona').then(()=>console.log("DB Connected"));
} 

connectDB();

// sqlite3db connection

const db = new sqlite3.Database('PERSONA_DB.db', (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.message);
    } else {
        console.log('Подключение к базе данных установлено.');
    }
});

// api endpoints

app.use("/api/persona", personaRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/response", responseRoute)
app.use("/api/cart", cartRouter) 

app.get("/", (req, res) => {
    res.send("API working")
})
app.get("/api/services", (req, res) => {
    db.all('SELECT * FROM SERVICES', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
      });
})

app.get("/api/price", (req, res) => {
    db.all('SELECT * FROM PRICE', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
      });
})

app.get("/api/master", (req, res) => {
    db.all('SELECT * FROM MASTER', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
      });
})

app.get("/api/narrowservices", (req, res) => {
    db.all('SELECT * FROM NARROW_SERVICES', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
      });
})

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${file.originalname}`)
    }
})

const upload = multer({storage:storage})

app.post("/api/salonphoto", upload.single("image"), (req, res) => {
    db.all('SELECT * FROM SALON', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
    });
})

app.get("/api/salonphoto", (req, res) => {
    db.all('SELECT * FROM SALON', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
    });
})

app.get("/api/salonphotoone", (req, res) => {
    db.all('SELECT * FROM SALON1', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
    });
})

app.get("/api/getinapps", (req, res) => {
    db.all('SELECT * FROM APPS', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
    });
})

app.get("/api/getsales", (req, res) => {
    db.all('SELECT * FROM SALES', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
    });
})

app.get("/api/catolog", (req, res) => {
    db.all('SELECT * FROM CATOLOG', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
    });
})

app.get("/api/catolog/:id", (req, res) => {
    db.all('SELECT ID FROM CATOLOG', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
    });
})



app.get("/data", async (req, res) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().query('SELECT * FROM Price'); // Замените на ваш запрос
        res.json(result.recordsets);
    } catch (err) {
        console.error('Ошибка при выполнении запроса:', err);
        res.status(500).send('Ошибка при выполнении запроса');
    }
});

// поиск
app.get('/api/services/search', (req, res) => {
    const query = req.query.q; // Получаем параметр поиска из запроса
    const sql = `SELECT * FROM PRICE WHERE NAME_SERVICE_PRICE LIKE ?`;
    
    db.all(sql, [`%${query}%`], (err, rows) => {
        if (err) {
            console.error('Ошибка при поиске услуг:', err.message);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        res.json(rows);
    });
});

process.on('exit', () => {
    db.close();
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://vlasovavarvara2004:<db_password>@cluster0.r9arn.mongodb.net/?
//Delete IP: 198.244.189.28/32
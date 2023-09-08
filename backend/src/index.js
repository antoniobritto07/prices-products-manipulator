import express from 'express';
import cors from 'cors';
import sequelize from './helpers/database.js'
import productRoute from './routes/Product.js';
import packRoute from './routes/Pack.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3333;

sequelize.authenticate().then(() => {
    console.log('server is connected.....')
}).catch((error) => {
    console.log(error.mensagem);
    console.log('não foi possível estabelecer conexão com banco de dados')
})

app.use("/product", productRoute);
app.use("/pack", packRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
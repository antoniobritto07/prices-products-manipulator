import { DataTypes } from 'sequelize';
import sequelize from '../helpers/database.js';

const Product = sequelize.define('Product', {
    code: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cost_price: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false,
    },
    sales_price: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false,
    },
}, {
    tableName: 'products',
    timestamps: false,
});

export default Product;



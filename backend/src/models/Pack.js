import { DataTypes } from 'sequelize';
import sequelize from '../helpers/database.js';

const Pack = sequelize.define('Pack', {
    pack_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'packs',
            key: 'id',
        },
    },
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'packs',
    timestamps: false,
});

export default Pack;

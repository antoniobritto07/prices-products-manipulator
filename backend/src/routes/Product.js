import express from 'express';
const router = express.Router();

import {
    // getAllProducts,
    getProductByCode,
    updateProductByCode
} from '../controllers/ProductController.js';

// router.get("/teste", getAllProducts);
router.get("/:code", getProductByCode);
router.patch("/:code", updateProductByCode);

export default router;
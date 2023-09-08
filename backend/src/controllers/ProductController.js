import Product from '../models/Product.js'

export async function getAllProducts(request, response) {
    const productsList = await Product.findAll();
    return response.json(productsList);
}

export async function getProductByCode(request, response) {
    const { code } = request.params;
    const productGotByCode = await Product.findOne({
        where: {
            code: code
        }
    });
    return response.json(productGotByCode);
}

export async function updateProductByCode(request, response) {
    const { code } = request.params;
    const { sales_price } = request.body;
    const productGotByCode = await Product.findOne({
        where: {
            code: code
        }
    });

    if (productGotByCode) {
        productGotByCode.sales_price = sales_price;
        await productGotByCode.save();
    }
    return response.json(productGotByCode);
}
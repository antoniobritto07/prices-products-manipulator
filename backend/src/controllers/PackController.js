import Pack from '../models/Pack.js'

export async function getAllPacks(request, response) {
    const packsList = await Pack.findAll();
    return response.json(packsList);
}

// export async function updatePackWhenProductIsUpdated({ productToBeUpdated, newPrice }) {
//     const { id, cost_price } = productToBeUpdated;

//     console.log(id)
//     console.log(cost_price)
//     const packProduct = await PackProduct.findOne({
//         where: {
//             product_id: id,
//         },
//     });

//     console.log(packProduct)

//     if (!packProduct) {
//         //produto sem pacote
//         return
//     }

//     //vendo se o pacote é apenas de um produto ou de mais de um
//     const relationsPackProduct = await PackProduct.findAll({
//         where: {
//             pack_id: packProduct.pack_id
//         }
//     })

//     console.log(relationsPackProduct);

//     const pack = await Pack.findOne({
//         where: {
//             id: relationsPackProduct[0].pack_id
//         }
//     })

//     console.log(pack)

//     if (relationsPackProduct.length === 1) {
//         const newPackPrice = relationsPackProduct[0].qty * newPrice;
//         const costPackPrice = relationsPackProduct[0].qty * cost_price

//         pack.sales_price = newPackPrice;
//         pack.cost_price = costPackPrice;

//         await pack.save();
//     }
// }

// const findPackByProductCode = async (code) => {
//     const packGotByProductCode = await Pack.findOne({
//         where: {
//             product_id: code
//         }
//     });

//     return packGotByProductCode;
// }

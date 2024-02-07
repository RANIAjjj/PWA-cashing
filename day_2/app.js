// import { openDB } from "https://cdn.jsdelivr.net/npm/idb@8/+esm";
// // async function useDb(){
// //     const dbpromise=await openDB('simple-database' , 1 ,{
// //         upgrade(db){
// //             if(!objectStoreNames.contains("user")){
// //                 db.createObjectStore('user' , {keyPath:'id' , outoIncrement:true} )
// //             }
// //             if(!objectStoreNames.contains("product")){
// //                 db.createObjectStore('product' , {keyPath:'prodId'} )
// //             }

// //         }
// //     })
// // }

// // useDb()

// async function addProduct() {
//   const dbpromise = await openDB("ecommerce", 1, {
//     upgrade(db) {
//       const objectStoreNames = db.objectStoreNames;

//       if (!objectStoreNames.contains("products")) {
//         db.createObjectStore("products", { keyPath: "id" });
//       }
//     },
//   });

//   var tx = dbpromise.transaction("products", "readwrite");
//   Promise.all([
//     tx.store.add({
//       id: 3,
//       name: "product 1",
//       price: 2000,
//     }),
//     tx.store.add({
//         id: 4,
//         name: "product 2",
//         price: 4000,
//       }),
//   ]);

// //   var product1 = {
// //     id: 1,
// //     name: "product 1",
// //     price: 2000,
// //   };
// //   await tx.store.add(product1);
// }


// async function getProduct(){
//     const dbpromise = await openDB('ecommerce' , 3)
//     var myProduct = await dbpromise.get('products' , 1)
//     console.log(myProduct);
// }
// window.getProduct = getProduct;

// window.addProduct = addProduct;









import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@8/+esm';
async function useDb(){
    const dbpromise=await openDB('simple-database' , 1 ,{
        upgrade(db){
            if(!objectStoreNames.contains("user")){
                db.createObjectStore('user' , {keyPath:'id' , outoIncrement:true} )
            }
            if(!objectStoreNames.contains("product")){
                db.createObjectStore('product' , {keyPath:'prodId'} )
            }

        }
    })
}

useDb()

async function addProduct() {
    const dbpromise = await openDB('market', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('products')) {
                db.createObjectStore('products', { keyPath: 'prdId' });
            }
        }
    });

    const tx = dbpromise.transaction('products', 'readwrite');

    await Promise.all([
        tx.store.add({
            prdId: 1,
            name: 'product-1',
            price: 100
        }),
        tx.store.add({
            prdId: 2,
            name: 'product-2',
            price: 500
        }),
        tx.store.add({
            prdId: 3,
            name: 'product-3',
            price: 300
        })
    ]);

    await tx.done;
   
}

async function getProduct() {
    const dbpromise = await openDB('market', 1);
    const myProduct = await dbpromise.get('products', 1);
    console.dir(myProduct);
}

async function updateProduct() {
    const dbpromise = await openDB('market', 1);
    const tx = dbpromise.transaction('products', 'readwrite');
    const product = await tx.store.get(1);
    if (product) {
        product.name = 'updated-product';
        product.price = 200;
        await tx.store.put(product);
      
    } 
}

async function deleteProduct() {
    const dbpromise = await openDB('market', 1);
    const tx = dbpromise.transaction('products', 'readwrite');
    const product = await tx.store.get(1);
    if (product) {
        await tx.store.delete(1);

    }
}

window.addProduct = addProduct;
window.getProduct = getProduct;
window.updateProduct = updateProduct;
window.deleteProduct = deleteProduct;

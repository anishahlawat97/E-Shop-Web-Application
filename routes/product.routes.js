const auth = require("../middleware/auth");

module.exports = (app) => {

    const product = require("../controllers/product.controller");
    var router = require("express").Router();

    //display products
    router.get("/products", product.displayProducts);

    //display categories
    router.get("/products/categories", product.getCategories);

    //display product by ID
    router.get("/products/:id", product.getProductByID);

    //add product to inventory
    router.post("/products",auth, product.addProducts);

    //update a product by ID
    router.put("/products/:id", auth, product.updateProductByID);

    //delete a product from the inventory
    router.delete("/products/:id", auth, product.deleteProductByID);

    app.use("/api", router);
}
module.exports = (app) => {
    const product = require("../controllers/product.controller");
    var router = require("express").Router();

    router.get("/products", product.displayProducts);

    // router.get("/products/categories", product.getCategories);

    // router.get("/products/:id", product.getProductById);

    // router.post("/products", product.addProducts);

    // router.put("/products/:id", product.updateProduct);

    // router.delete("/products/:id", product.deleteProduct);

    app.use("/api", router);
}
const auth = require("../middleware/auth");

module.exports = (app) => {

    const product = require("../controllers/product.controller");
    var router = require("express").Router();

    router.get("/products", product.displayProducts);

    router.get("/products/categories", product.getCategories);

    router.get("/products/:id", product.getProductByID);

    // router.post("/products", auth, product.addProducts);

    router.put("/products/:id", auth, product.updateProductByID);

    router.delete("/products/:id", product.deleteProductByID);

    app.use("/api", router);
}
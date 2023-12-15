const { Router } = require("express");
const { signup,login,getUsersList, getUser} = require("../controller/UserController")
const { upload, addProduct, getProducts, deleteProducts, updateProducts } = require("../controller/ProductsController");

const Auth = require("../middleware/Auth");

const router = Router();

////////// User Routes ///////////

router.post("/signup", signup);
router.post("/login", login);
router.post("/Auth", Auth);
router.get("/get-userlist", Auth, getUsersList);
router.get("/get-user/:id", Auth, getUser);


/////// Products Routes ////////////////

router.post("/add-product", Auth, upload.array("image", 5), addProduct);
router.get("/get-product", Auth, getProducts);
router.delete("/delete-product/:id", Auth, deleteProducts);
router.put("/update-product/:id", Auth, updateProducts);;

module.exports = router;

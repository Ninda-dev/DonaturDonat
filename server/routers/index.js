const express = require('express')
const errorHandler = require('../middleware/error')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const UserController = require('../controllers/userController')
const ProductController = require('../controllers/productController')
const ClaimController = require('../controllers/claimController')
const router = express.Router()


//Register Login
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/auth/google', UserController.googleLogin)

router.post('/gemini-ai', ProductController.geminiApi)

router.use(authentication)

//Claim (conjunction)
router.get('/claims', ClaimController.getClaimByUserId)
router.post('/claims/:id', ClaimController.createClaim)

router.get('/products', ProductController.getAllProduct)
router.get('/products/:id', ProductController.getProductById)

router.use(authorization)

router.post('/products', ProductController.createProduct)
router.put('/products/:id', ProductController.updateProduct)
router.delete('/products/:id', ProductController.deleteProduct)

router.use(errorHandler);

module.exports = router
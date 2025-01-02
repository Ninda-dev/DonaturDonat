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
router.get('/claims', ClaimController.getClaim)
router.get('/claims/:id', ClaimController.getClaimByUserId)
router.get('/claims/product/:id', ClaimController.getClaimByProductId)
router.post('/claims/:id', ClaimController.createClaim)
router.delete('/claims/:id', authorization, ClaimController.doneClaim)

//Product
router.get('/products', ProductController.getAllProduct)
router.get('/products/:id', ProductController.getProductById)

router.put('/products/:id', ProductController.updateProduct)
router.delete('/products/:id', ProductController.deleteProduct)

router.use(authorization)
router.post('/products', ProductController.createProduct)

//User
router.get('/users', UserController.getUser)
router.delete('/user/:id', UserController.deleteUser)

router.use(errorHandler);

module.exports = router
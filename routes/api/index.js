const router = require('express').Router();

const authRoutes = require('./auth')
const formRoutes = require('./forms')
const answerRoutes = require('./answers')
const questionRoutes = require('./questions')
const responseRoutes = require('./responses')
const graphRoutes = require('./graph')

const authMiddleware = require('../../middleware/authMiddleware'); 

// register routes 
router.use('/auth',authRoutes) 

// form routes
router.use('/form', authMiddleware.authenticateAdmin,formRoutes);

// answer routes
router.use('/answer', answerRoutes);

// question routes
router.use('/question', authMiddleware.authenticateAdmin,questionRoutes);

// response routes
router.use('/response', responseRoutes);

// graph routes
router.use('/graph', authMiddleware.authenticateAdmin, graphRoutes);

module.exports = router;
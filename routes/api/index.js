const router = require('express').Router();


const formRoutes = require('./forms')
const answerRoutes = require('./answers')
const questionRoutes = require('./questions')
const responseRoutes = require('./responses')
const graphRoutes = require('./graph')

// form routes
router.use('/form', formRoutes);

// answer routes
router.use('/answer', answerRoutes);

// question routes
router.use('/question', questionRoutes);

// response routes
router.use('/response', responseRoutes);

// graph routes
router.use('/graph', graphRoutes);

module.exports = router;
const express = require('express');
const { getTransactions, getStatistics, getBarChart, getPieChart } = require('../controllers/transactionController');
const router = express.Router();

router.get('/transactions', getTransactions);
router.get('/statistics', getStatistics);
router.get('/barchart', getBarChart);
router.get('/piechart', getPieChart);

module.exports = router;

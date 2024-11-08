const Transaction = require('../models/Transaction');

// Fetch transactions with search and pagination
exports.getTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;
    const query = {};

    // Filter by month
    if (month) {
        const monthNumber = new Date(`01 ${month} 2020`).getMonth() + 1;
        query.dateOfSale = { $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] } };
    }

    // Search filter
    if (search) {
        query.$or = [
            { title: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') },
            { price: new RegExp(search, 'i') }
        ];
    }

    // Pagination
    const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(Number(perPage));

    const totalItems = await Transaction.countDocuments(query);
    res.json({ transactions, totalItems });
};

// Fetch statistics
exports.getStatistics = async (req, res) => {
    const { month } = req.query;
    const monthNumber = new Date(`01 ${month} 2020`).getMonth() + 1;
    const match = { $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] } };

    const totalSale = await Transaction.aggregate([
        { $match: match },
        { $group: { _id: null, totalSale: { $sum: "$price" } } },
    ]);

    const totalSoldItems = await Transaction.countDocuments({ ...match, sold: true });
    const totalNotSoldItems = await Transaction.countDocuments({ ...match, sold: false });

    res.json({
        totalSale: totalSale[0]?.totalSale || 0,
        totalSoldItems,
        totalNotSoldItems,
    });
};

// Fetch bar chart data
exports.getBarChart = async (req, res) => {
    const { month } = req.query;
    const monthNumber = new Date(`01 ${month} 2020`).getMonth() + 1;
    const match = { $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] } };

    const barChartData = await Transaction.aggregate([
        { $match: match },
        { $bucket: {
            groupBy: "$price",
            boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
            default: "901-above",
            output: { count: { $sum: 1 } }
        }}
    ]);

    res.json(barChartData);
};

// Fetch pie chart data
exports.getPieChart = async (req, res) => {
    const { month } = req.query;
    const monthNumber = new Date(`01 ${month} 2020`).getMonth() + 1;
    const match = { $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] } };

    const pieChartData = await Transaction.aggregate([
        { $match: match },
        { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.json(pieChartData);
};

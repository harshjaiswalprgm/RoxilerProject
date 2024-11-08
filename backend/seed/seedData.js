const axios = require('axios');
const Transaction = require('../models/Transaction');

const seedDatabase = async () => {
    const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
    const response = await axios.get(url);
    await Transaction.deleteMany({});
    await Transaction.insertMany(response.data);
    console.log("Database seeded");
};
module.exports = seedDatabase;

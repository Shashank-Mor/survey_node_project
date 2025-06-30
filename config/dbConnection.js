const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
            retryWrites: true,
            maxPoolSize: 10
        });
        console.log(`MongoDB Connected: ${connect.connection.host}, ${connect.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        setTimeout(connectDb, 5000); // Retry after 5 seconds
    }
};

module.exports = connectDb;
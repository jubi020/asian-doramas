//this will be triggered when the application is running in the prodcution environment

module.exports = {
    mongoURL : process.env.MONGO_URL
};

// export const mongoURL = process.env.MONGO_URL;
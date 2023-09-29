const internalError = (error, res) => {
    console.error(error);
    res.status(500).json({
        message: 'Internal server error',
    });
};

module.exports = {
    internalError,
};
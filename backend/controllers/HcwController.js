const getUser = (req, res) => {
    res.status(200).json({
        message: "success"
    });
};

module.exports = {
    getUser
};
const home = (req, res) => {
    res.status(200).json({
        message: "hcw homepage"
    });
}
const getUser = (req, res) => {
    res.status(200).json({
        message: "success"
    });
};

module.exports = {
    home,
    getUser
};
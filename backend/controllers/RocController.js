const { Roc } = require('../utils/db')
const home = (req, res) => {
    res.status(200).json({
        message: "this is ROC homepage"
    })
}
const getNoOfUser = async (req, res) => {
    const users = await Roc.nbusers();
    res.status(200).json({ users })
};

module.exports = {
    home,
    getNoOfUser
};
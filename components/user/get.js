const { WriteUser, User } = require("../../models/usermodel");

module.exports = async (req, res) => {
    try {
        const userId = req.params.id;

        const userCheck = await User.where({ id: userId }).fetch({ require: false });

        if (!userCheck) {
            return res.status(404).send("User not found");
        }

        return res.success({ userCheck });
    } catch (error) {
        return res.serverError(500, error);
    }
};

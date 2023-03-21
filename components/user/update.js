const { WriteUser, User } = require("../../models/usermodel");

module.exports = async (req, res) => {
    try {
        const body = req.body.user;
        const userId = req.params.id;

        const userCheck = await User.where({ id: userId }).fetch({ require: false });

        if (!userCheck) {
            return res.status(404).send("User not found");
        }

        let updatedUser = await new WriteUser().where({ id: userId }).save(body, { method: "update" });

        return res.success({ updatedUser });
    } catch (error) {
        return res.serverError(500, error);
    }
};

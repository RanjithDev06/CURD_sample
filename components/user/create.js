const { WriteUser, User } = require("../../models/usermodel");

module.exports = async (req, res) => {
    try {
        const body = req.body.user;

        const userCheck = await User.where({ email: body.email }).fetch({ require: false });

        if (userCheck) {
            return res.status(400).send("User already exist");
        }

        let newUser = await new WriteUser().save(body);

        return res.success({ newUser });
    } catch (error) {
        return res.serverError(500, error);
    }
};

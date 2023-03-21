const { read_bookshelf, write_bookshelf } = require("../config/bookshelf");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { bcryptConfig } = require("../config");

const User = read_bookshelf.model("User", {
    tableName: "users",
    hasTimestamps: true,
    autoIncrement: true,
    initialize: function () {
        this.on("saving", function (model, attributes, options) {
            if (attributes.password && this.hasChanged()) {
                attributes.password = bcrypt.hashSync(attributes.password, bcryptConfig.hashRound);
            }
            if (attributes.email) {
                attributes.email = attributes.email.toLowerCase().trim();
            }
        });
        this.on("fetched", async function (model, attributes, options) {
            if (model.relations) {
                const obj = model.relations;
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        model.attributes[key] = model.related(key).toJSON();
                    }
                }
            }
        });
        this.on("fetched:collection", async function (model, attributes, options) {
            model.models.forEach((innerModel) => {
                if (innerModel.relations) {
                    const obj = innerModel.relations;
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            innerModel.attributes[key] = innerModel.related(key).toJSON();
                        }
                    }
                }
            });
        });
    },
});

User.prototype.toJSON = function () {
    const that = this.attributes;
    return _.omit(that, []);
};

const WriteUser = write_bookshelf.model("WriteUser", {
    tableName: "users",
    hasTimestamps: true,
    autoIncrement: true,
    initialize: function () {
        this.on("saving", function (model, attributes, options) {
            if (attributes.password && this.hasChanged()) {
                attributes.password = bcrypt.hashSync(attributes.password, bcryptConfig.hashRound);
            }
            if (attributes.email) {
                attributes.email = attributes.email.toLowerCase().trim();
            }
        });
    },
});

module.exports = {
    User: User,
    WriteUser: WriteUser,
};

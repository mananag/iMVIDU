const {DataTypes, Sequelize} = require('sequelize')

const userSchema = (sequelize) => {
    const attributes = {
        first: {
            type : DataTypes.STRING, 
            allowNull : false
        },
        last: {
            type : DataTypes.STRING, 
            allowNull : false
        },
        email: {
            type : DataTypes.STRING, 
            allowNull : false
        },
        hash: {
            type : DataTypes.STRING, 
            allowNull : false
        },
    }

    const options = {
        defaultScope: {
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}

module.exports = userSchema
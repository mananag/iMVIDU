const {DataTypes} = require('sequelize')

const courseSchema = (sequelize) => {
    const attributes = {
        title : {
            type: DataTypes.STRING,
            allowNull: false
        },
        details : {
            type: DataTypes.STRING,
            allowNull: false 
        },
        price : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        owner : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    return sequelize.define('Course', attributes);
}

module.exports = courseSchema
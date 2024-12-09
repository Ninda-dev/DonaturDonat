'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Claim extends Model {

    static associate(models) {
      Claim.belongsTo(models.User);
      Claim.belongsTo(models.Product);
    }
  }
  Claim.init({
    date: {
      type:DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'date is required'
        },
        notEmpty: {
          msg: 'date is required'
        }
      }
    },
    UserId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId is required'
        },
        notEmpty: {
          msg: 'UserId is required'
        }
      }
    },
    ProductId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'ProductId is required'
        },
        notEmpty: {
          msg: 'ProductId is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Claim',
  });
  return Claim;
};
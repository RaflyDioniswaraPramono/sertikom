"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LetterCategories extends Model {
    static associate(models) {
      LetterCategories.hasMany(models.Letters, { foreignKey: "category_id" });
    }
  }
  LetterCategories.init(
    {
      category_name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "LetterCategories",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return LetterCategories;
};

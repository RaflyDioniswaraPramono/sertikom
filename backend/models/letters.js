"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Letters extends Model {
    static associate(models) {
      Letters.belongsTo(models.LetterCategories, { foreignKey: "category_id" });
    }
  }
  Letters.init(
    {
      category_id: DataTypes.INTEGER,
      letter_number: DataTypes.STRING,
      title: DataTypes.STRING,
      upload_time: DataTypes.DATE,
      file_path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Letters",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Letters;
};

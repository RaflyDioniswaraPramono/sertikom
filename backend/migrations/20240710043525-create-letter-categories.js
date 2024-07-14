"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LetterCategories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category_name: {
        type: Sequelize.STRING({ length: 50 }),
      },
      description: {
        type: Sequelize.STRING({ length: 150 }),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("LetterCategories");
  },
};

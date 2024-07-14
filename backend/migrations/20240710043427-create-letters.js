"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Letters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      letter_number: {
        type: Sequelize.STRING({ length: 20 }),
      },
      title: {
        type: Sequelize.STRING({ length: 50 }),
      },
      upload_time: {
        type: Sequelize.DATE,
      },
      file_path: {
        type: Sequelize.STRING({ length: 255 }),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Letters");
  },
};

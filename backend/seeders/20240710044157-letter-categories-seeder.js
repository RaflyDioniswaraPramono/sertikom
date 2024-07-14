"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const payload = JSON.parse(fs.readFileSync("./seeds/letter-category-seeds.json"));

    const data = [];

    payload.map((letterCategorySeeds) => {
      const { category_name, description } = letterCategorySeeds;

      data.push({
        category_name,
        description,
      });
    });

    await queryInterface.bulkInsert("LetterCategories", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("LetterCategories", null, {});
  },
};

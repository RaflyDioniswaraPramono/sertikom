const { Op } = require("sequelize");
const { LetterCategories, Letters } = require("../models");

class LetterCategoryController {
  // post letter cateogry
  static async addLetterCategory(req, res) {
    try {
      const { categoryName, description } = req.body;

      const checkLetterCategoryName = await LetterCategories.findOne({
        where: {
          category_name: categoryName,
        },
      });

      if (checkLetterCategoryName) {
        return res.status(409).json({
          success: false,
          message: `Kategori surat <b>${categoryName}</b> sudah ada!`,
        });
      }

      const data = await LetterCategories.create({
        category_name: categoryName,
        description: description,
      });

      res.status(200).json({
        success: true,
        data: data,
        message: `Berhasil menambah kategori surat dengan nama kategori <b>${categoryName}</b>!`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // get letter categories
  static async getLetterCategories(req, res) {
    try {
      const data = await LetterCategories.findAll();

      if (data.length == 0) {
        return res.status(200).json({
          success: true,
          message: "Kategori surat masih kosong, tambahkan kategori surat baru!",
        });
      } else {
        res.status(200).json({
          success: true,
          data: data,
          message: "Berhasil mengambil semua data kategori surat!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // get letter category by id
  static async getLetterCategoryById(req, res) {
    try {
      const id = req.params.id;

      const letterCategory = await LetterCategories.findOne({
        where: {
          id: id,
        },
      });

      if (!letterCategory) {
        return res.status(404).json({
          success: false,
          message: "Kategori surat tidak ditemukan!",
        });
      }

      res.status(200).json({
        success: true,
        data: letterCategory,
        message: "Berhasil mengambil data kategori surat!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  // update letter category
  static async updateLetterCategory(req, res) {
    try {
      const id = req.params.id;
      const { categoryName, description } = req.body;

      const letterCategory = await LetterCategories.findOne({
        where: {
          id: id,
        },
      });

      if (!letterCategory) {
        return res.status(404).json({
          success: false,
          message: "Kategori surat tidak ditemukan!",
        });
      }

      if (letterCategory.category_name !== categoryName) {
        const checkCategoryName = await LetterCategories.findOne({
          where: {
            category_name: categoryName,
          },
        });

        if (checkCategoryName) {
          return res.status(409).json({
            success: false,
            message: `Kategori surat <b>${categoryName}</b> sudah ada!`,
          });
        }
      }

      await LetterCategories.update(
        {
          category_name: categoryName,
          description: description,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).json({
        success: true,
        message: `Berhasil mengubah kategori surat <b>${letterCategory.category_name}</b> menjadi <b>${categoryName}</b>!`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // delete letter category
  static async deleteLetterCategory(req, res) {
    try {
      const id = req.params.id;

      const letterCategory = await LetterCategories.findOne({
        where: {
          id: id,
        },
      });

      if (!letterCategory) {
        return res.status(404).json({
          success: false,
          message: "Kategori surat tidak ditemukan!",
        });
      }

      const checkLetter = await Letters.findOne({
        where: {
          category_id: id,
        },
      });

      if (checkLetter) {
        return res.status(409).json({
          success: false,
          message: `Tidak dapat menghapus kategori <b>${letterCategory.category_name}</b>, karena terdapat arsip surat yang menggunakan kategori ini!`,
        });
      }

      await LetterCategories.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        success: true,
        message: `Berhasil menghapus kategori surat <b>${letterCategory.category_name}</b>!`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // search letter category
  static async searchLetterCategory(req, res) {
    try {
      const keyword = req.params.keyword;

      const data = await LetterCategories.findAll({
        where: {
          category_name: {
            [Op.like]: `%${keyword}%`,
          },
        },
      });

      if (data.length == 0) {
        return res.status(404).json({
          success: false,
          message: `Kategori surat dengan kata kunci <b>${keyword}</b> tidak ditemukan!`,
        });
      }

      res.status(200).json({
        success: true,
        data: data,
        message: `Pencarian kategori surat dengan kata kunci <b>${keyword}</b> ditemukan!`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = LetterCategoryController;

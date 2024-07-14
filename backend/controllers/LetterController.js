const { Letters, LetterCategories } = require("../models");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");

class LetterController {
  // add letter
  static async addLetter(req, res) {
    try {
      const { categoryId, letterNumber, title } = req.body;
      const letterPath = req.file.path;

      const checkLetterNumber = await Letters.findOne({
        where: {
          letter_number: letterNumber,
        },
      });

      if (checkLetterNumber) {
        return res.status(409).json({
          success: false,
          field: "letterNumber",
          message: `Nomor surat ${letterNumber} sudah ada, nomor surat tidak boleh sama!`,
        });
      }

      const checkTitle = await Letters.findOne({
        where: {
          title: title,
        },
      });

      if (checkTitle) {
        return res.status(409).json({
          success: false,
          field: "title",
          message: `Judul surat ${title} sudah ada, tambahkan judul surat yang lain!`,
        });
      }

      if (!req.file || !req.file.originalname.match(/\.(pdf)$/)) {
        return res.status(400).json({
          success: false,
          field: "file",
          message: "Hanya file PDF yang diizinkan untuk diunggah",
        });
      }

      const data = await Letters.create({
        category_id: categoryId,
        letter_number: letterNumber,
        title: title,
        upload_time: new Date(),
        file_path: letterPath,
      });

      res.status(200).json({
        success: true,
        data: data,
        message: `Berhasil melakukan arsip surat dengan judul <b>${title}</b>!`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  }

  // get letters
  static async getLetters(req, res) {
    try {
      const data = await Letters.findAll({
        include: [{ model: LetterCategories, attributes: ["category_name", "description"] }],
        order: [["upload_time", "DESC"]],
      });

      if (data.length == 0) {
        return res.status(200).json({
          success: true,
          message: "Arsip surat masih kosong, arsipkan surat baru!",
        });
      } else {
        res.status(200).json({
          success: true,
          data: data,
          message: "Berhasil mengambil seluruh data arsip surat!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // get letter by id
  static async getLetterById(req, res) {
    try {
      const id = req.params.id;

      const findLetter = await Letters.findOne({
        include: [{ model: LetterCategories, attributes: ["category_name", "description"] }],
        where: {
          id: id,
        },
      });

      if (!findLetter) {
        return res.status(404).json({
          success: false,
          message: "Data arsip surat tidak ditemukan!",
        });
      }

      res.status(200).json({
        success: true,
        data: findLetter,
        message: "Berhasil mengambil data arsip surat!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  // download file letter
  static async downloadLetter(req, res) {
    try {
      const id = req.params.id;

      const data = await Letters.findOne({
        where: {
          id: id,
        },
      });

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Data arsip surat tidak ditemukan!",
        });
      }
      const fileName = path.basename(data.file_path);
      const filePath = path.join(__dirname, "../uploads", fileName);

      res.download(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // preview letter
  static async previewLetter(req, res) {
    try {
      const id = req.params.id;

      const file = await Letters.findOne({
        where: {
          id: id,
        },
      });

      if (!file) {
        return res.status(404).json({
          success: false,
          message: "File tidak ditemukan!",
        });
      }

      const fileName = path.basename(file.file_path);
      const filePath = path.join(__dirname, "../uploads", fileName);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          success: false,
          message: "File tidak ditemukan di server!",
        });
      }

      res.setHeader("Content-Type", "application/pdf");

      const fileStream = fs.createReadStream(filePath);

      fileStream.pipe(res);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateLetter(req, res) {
    try {
      const id = req.params.id;
      const { categoryId, letterNumber, title } = req.body;
      const newFile = req.file.path;

      const data = await Letters.findOne({
        where: {
          id: id,
        },
      });

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Data arsip surat tidak ditemukan!",
        });
      }

      if (letterNumber !== data.letter_number) {
        const checkLetterNumber = await Letters.findOne({
          where: {
            letter_number: letterNumber,
          },
        });

        if (checkLetterNumber) {
          return res.status(409).json({
            success: false,
            field: "letterNumber",
            message: `Nomor surat ${letterNumber} sudah ada, nomor surat tidak boleh sama!`,
          });
        }
      }

      if (title !== data.title) {
        const checkTitle = await Letters.findOne({
          where: {
            title: title,
          },
        });

        if (checkTitle) {
          return res.status(409).json({
            success: false,
            field: "title",
            message: `Judul surat ${title} sudah ada, tambahkan judul surat yang lain!`,
          });
        }
      }

      if (!req.file || !req.file.originalname.match(/\.(pdf)$/)) {
        return res.status(400).json({
          success: false,
          field: "file",
          message: "Hanya file PDF yang diizinkan untuk diunggah",
        });
      }

      // Hapus file lama dari sistem file
      const fileName = path.basename(data.file_path);
      const oldFilePath = path.join(__dirname, "../uploads", fileName);
      fs.unlinkSync(oldFilePath);

      await Letters.update(
        {
          category_id: categoryId,
          letter_number: letterNumber,
          title: title,
          file_path: newFile,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).json({
        success: true,
        message: "Berhasil mengganti arsip surat yang baru!",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  // delete letter
  static async deleteLetter(req, res) {
    try {
      const id = req.params.id;

      const data = await Letters.findOne({
        where: {
          id: id,
        },
      });

      if (!data) {
        return res.status(404).send("Data arsip surat tidak ditemukan!");
      }

      const fileName = path.basename(data.file_path);
      const filePath = path.join(__dirname, "../uploads", fileName);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await Letters.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        success: true,
        message: `Berhasil menghapus data arsip surat <b>${data.title}</b>`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async searchLetter(req, res) {
    try {
      const keyword = req.params.keyword;

      const data = await Letters.findAll({
        include: [
          {
            model: LetterCategories,
            attributes: ["category_name", "description"],
          },
        ],
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${keyword}%` } },
            { "$LetterCategory.category_name$": { [Op.like]: `%${keyword}%` } },
          ],
        },
      });

      if (data.length == 0) {
        return res.status(404).json({
          success: false,
          message: `Data arsip surat dengan judul <b>${keyword}</b> tidak ditemukan!`,
        });
      }

      res.status(200).json({
        success: true,
        data: data,
        message: `Berhasil mencari data arsip surat dengan judul ${keyword}!`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = LetterController;

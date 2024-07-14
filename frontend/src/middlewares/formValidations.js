export const addLetterValidation = (values) => {
  const { letterNumber, title, file } = values;

  const regex = /^(?=.*[^\d.,\s])[\w\d\s.,!?-]+$/;

  const errors = {};

  if (!letterNumber) {
    errors.letterNumber = "* nomor surat tidak boleh kosong!"
  }

  if (letterNumber.length < 10) {
    errors.letterNumber = "* nomor surat tidak boleh kurang dari 10 karakter!"
  }  

  if (!title) {
    errors.title = "* judul surat tidak boleh kosong!"
  }

  if (title.length < 8) {
    errors.title = "* judul surat tidak boleh kurang dari 8 karakter!"
  }

  if (!regex.test(title)) {
    errors.title = "* judul surat tidak valid!"
  }

  if (!file) {
    errors.file = "* surat yang akan diarsip harus diisi!"
  }  

  return errors;
};

export const editLetterValidation = (values) => {
  const { letterNumber, title, file } = values;

  const regex = /^(?=.*[^\d.,\s])[\w\d\s.,!?-]+$/;

  const errors = {};

  if (!letterNumber) {
    errors.letterNumber = "* nomor surat tidak boleh kosong!"
  }

  if (letterNumber.length < 10) {
    errors.letterNumber = "* nomor surat tidak boleh kurang dari 10 karakter!"
  }  

  if (!title) {
    errors.title = "* judul surat tidak boleh kosong!"
  }

  if (title.length < 8) {
    errors.title = "* judul surat tidak boleh kurang dari 8 karakter!"
  }

  if (!regex.test(title)) {
    errors.title = "* judul surat tidak valid!"
  }

  if (!file) {
    errors.file = "* surat yang akan diarsip harus diisi!"
  }  

  return errors;
};

export const addLetterCategoryValidation = (values) => {
  const { categoryName, description } = values;

  const errors = {};

  const regex = /^(?=.*[^\d.,\s])[\w\d\s.,!?-]+$/;

  if (!categoryName) {
    errors.categoryName = "* nama kategori surat tidak boleh kosong!";
  }

  if (categoryName.length < 3) {
    errors.categoryName = "* nama kategori surat tidak boleh kurang dari 5 karakter!";
  }

  if (!regex.test(categoryName)) {
    errors.categoryName = "* nama kategori surat tidak valid!";
  }

  if (!description) {
    errors.description = "* judul kategori surat tidak boleh kosong!";
  }

  if (description.length < 10) {
    errors.description = "* judul kategori surat tidak boleh kurang dari 10 karakter!";
  }

  if (!regex.test(description)) {
    errors.description = "* nama kategori surat tidak valid!";
  }

  if (description.length > 150) {
    errors.description = "* jumlah maksimal karakter melebihi batas!";
  }

  return errors;
};

export const editLetterCategoryValidation = (values) => {
  const { categoryName, description } = values;

  const errors = {};

  const regex = /^(?=.*[^\d.,\s])[\w\d\s.,!?-]+$/;

  if (!categoryName) {
    errors.categoryName = "* nama kategori surat tidak boleh kosong!";
  }

  if (categoryName.length < 3) {
    errors.categoryName = "* nama kategori surat tidak boleh kurang dari 5 karakter!";
  }

  if (!regex.test(categoryName)) {
    errors.categoryName = "* nama kategori surat tidak valid!";
  }

  if (!description) {
    errors.description = "* judul kategori surat tidak boleh kosong!";
  }

  if (description.length < 10) {
    errors.description = "* judul kategori surat tidak boleh kurang dari 10 karakter!";
  }

  if (!regex.test(description)) {
    errors.description = "* nama kategori surat tidak valid!";
  }

  if (description.length > 150) {
    errors.description = "* jumlah karakter judul melebihi 150 karakter!";
  }

  return errors;
};

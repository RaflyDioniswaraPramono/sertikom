import { create } from "zustand";

export const letterCategoryState = create((set) => ({
  letterCategoryData: [],
  setLetterCategoryData: (letterCategoryData) =>
    set({
      letterCategoryData: letterCategoryData,
    }),
}));

export const editLetterCategoryState = create((set) => ({
  letterCategoryData: [],
  setLetterCategoryData: (letterCategoryData) =>
    set({
      letterCategoryData: letterCategoryData,
    }),
}));

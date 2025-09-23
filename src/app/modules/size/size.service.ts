import { TSize } from './size.interface';
import { sizeModel } from './size.model';

const createSizeByDB = async (size: TSize) => {
  const result = await sizeModel.create(size);
  return result;
};
const getAllSizeByDB = async () => {
  const result = await sizeModel.find();
  return result;
};
const getSingleSizeByDB = async (id: string) => {
  const result = await sizeModel.findById(id);
  return result;
};

const getSingleSizeBySlug = async (slug: string) => {
  const result = await sizeModel.findOne({ slug });
  return result;
};

const updateSingleSizeByDB = async (id: string, updateSize: TSize) => {
  const result = await sizeModel.findByIdAndUpdate(id, updateSize, {
    new: true,
  });
  return result;
};

const deleteSingleSizeByDB = async (id: string) => {
  const result = await sizeModel.findByIdAndDelete(id);
  return result;
};

export const sizeService = {
  createSizeByDB,
  getAllSizeByDB,
  getSingleSizeByDB,
  getSingleSizeBySlug,
  updateSingleSizeByDB,
  deleteSingleSizeByDB,
};

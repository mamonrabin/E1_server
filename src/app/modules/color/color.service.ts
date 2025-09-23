import { TColor } from './color.interface';
import { colorModel } from './color.model';

const createColorByDB = async (color: TColor) => {
  const result = await colorModel.create(color);
  return result;
};
const getAllColorByDB = async () => {
  const result = await colorModel.find().populate([
      {
        path: 'size',
      },
    ]);
  return result;
};
const getSingleColorByDB = async (id: string) => {
  const result = await colorModel.findById(id);
  return result;
};

const getSingleColorBySlug = async (slug: string) => {
  const result = await colorModel.findOne({ slug });
  return result;
};

const updateSingleColorByDB = async (id: string, updateColor: TColor) => {
  const result = await colorModel.findByIdAndUpdate(id, updateColor, {
    new: true,
  });
  return result;
};

const deleteSingleColorByDB = async (id: string) => {
  const result = await colorModel.findByIdAndDelete(id);
  return result;
};

export const colorService = {
  createColorByDB,
  getAllColorByDB,
  getSingleColorByDB,
  getSingleColorBySlug,
  updateSingleColorByDB,
  deleteSingleColorByDB,
};

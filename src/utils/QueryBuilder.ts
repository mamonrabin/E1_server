import { searchAbleFields } from './searchFileAble';

export const QueryBuilder = async (query: Record<string, unknown>) => {
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const filters: Record<string, unknown> = {
    $or: searchAbleFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  };

  if (query?.category) {
    filters.category = query.category;
  }
  if (query?.subCategory) {
    filters.subCategory = query.subCategory;
  }
  if (query?.brand) {
    filters.brand = query.brand;
  }

  return filters;
};

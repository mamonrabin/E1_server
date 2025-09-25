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
  // if (query?.brand) {
  //   filters.slug = query.brand; // ← use slug field
  // }

    // ✅ Filter by colors (ObjectId from colors array)
  if (query?.colors) {
    const colors = (query.colors as string).split(',');
    filters.colors = { $in: colors };
  }

  // ✅ Filter by size (nested in colors.size)
  if (query?.size) {
    const sizes = (query.size as string).split(',');
    filters['colors.size'] = { $in: sizes };
  }

  return filters;
};

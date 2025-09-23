export interface SortOptions {
  sortField: string;
  sortOrder: 1 | -1;
}

export const getSortOptions = (sortBy?: string): SortOptions => {
  let sortField = 'createdAt';
  let sortOrder: 1 | -1 = -1;

  switch (sortBy) {
    case 'a-z':
      sortField = 'title';
      sortOrder = 1;
      break;
    case 'z-a':
      sortField = 'title';
      sortOrder = -1;
      break;
    case 'priceLowToHigh':
      sortField = 'price';
      sortOrder = 1;
      break;
    case 'priceHighToLow':
      sortField = 'price';
      sortOrder = -1;
      break;
    case 'dateOldToNew':
      sortField = 'createdAt';
      sortOrder = 1;
      break;
    case 'dateNewToOld':
    default:
      sortField = 'createdAt';
      sortOrder = -1;
  }

  return { sortField, sortOrder };
};

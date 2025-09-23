export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export const getPaginationOptions = (
  query: Record<string, unknown>,
): PaginationOptions => {
  const page = query?.page ? parseInt(query.page as string, 10) : 1;
  const limit = query?.limit ? parseInt(query.limit as string, 10) : 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

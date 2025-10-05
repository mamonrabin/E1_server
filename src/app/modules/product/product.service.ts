import { getPaginationOptions } from '../../../utils/pagination';
import { QueryBuilder } from '../../../utils/QueryBuilder';
import { getSortOptions } from '../../../utils/sort';
import { TProduct } from './product.interface';
import { productModel } from './product.model';

const createProductByBD = async (product: TProduct) => {
  const result = await productModel.create(product);
  return result;
};
const getAllProductByBD = async () => {
  const result = await productModel.find().populate([
      {
        path: 'category',
      },
      {
        path: 'colors',
        populate: {
        path: 'size',
      },
      },
      
      {
        path: 'brand',
      },
    ]);
  return result;
};

const getNewArrivalProducts = async (limit = 8) => {
  const result = await productModel.find().populate([
      {
        path: 'category',
      },
      
      {
        path: 'colors',
        populate: {
        path: 'size',
      },
      },
      {
        path: 'brand',
      },
    ]).sort({ createdAt: -1 }).limit(limit);
  return result;
};

const getDiscountProducts = async (limit = 8) => {
  const result = await productModel
    .find({
      discount: { $gt: 0 }, // only discounted products
    }).populate([
      {
        path: 'category',
      },
      {
        path: 'colors',
        populate: {
        path: 'size',
      },
      },
      {
        path: 'brand',
      },
    ])
    .sort({ createdAt: -1 })
    .limit(limit);
  return result;
};

// const getBestSellerProducts = async (limit = 8) => {
//   // Check if there are products with soldQuantity > 0
//   const soldProducts = await productModel
  
//     .find({ soldQuantity: { $gt: 0 } })
//     .populate([
//       {
//         path: 'category',
//       },
//       {
//         path: 'colors',
        
//       },
//       {
//         path: 'brand',
//       },
//     ])
//     .sort({ soldQuantity: -1 }) // highest sales first
//     .limit(limit);

//   if (soldProducts.length > 0) {
//     return soldProducts;
//   }

//   // If no sold products → return latest 8 products
//   const defaultProducts = await productModel
  
//     .find()
//     .populate([
//       {
//         path: 'category',
//       },
//       {
//         path: 'colors',
//         populate: {
//         path: 'size',
//       },
//       },
//       {
//         path: 'brand',
//       },
//     ])
//     .sort({ createdAt: -1 }) // newest first
//     .limit(limit);

//   return defaultProducts;
// };

// const getAllProductByBDWithPagination = async (
//   query: Record<string, unknown>,
// ) => {
//   // Get sort options
//   const { sortField, sortOrder } = getSortOptions(query.sortBy as string);

//   // Get pagination options
//   const { skip, limit } = getPaginationOptions(query);

//   const filters = await QueryBuilder(query);

//   // ✅ Price range filter
//   const minPrice = Number(query.minPrice);
//   const maxPrice = Number(query.maxPrice);
//   if (!isNaN(minPrice) || !isNaN(maxPrice)) {
//     filters.price = {}; // add the price object
//     if (!isNaN(minPrice))
//       (filters.price as Record<string, number>).$gte = minPrice;
//     if (!isNaN(maxPrice))
//       (filters.price as Record<string, number>).$lte = maxPrice;
//   }

//   const result = await productModel
//     .find(filters)
//     .populate([
//       {
//         path: 'category',
//       },
//       {
//         path: 'colors',
//         populate: {
//         path: 'size',
//       },
//       },
//       {
//         path: 'brand',
//       },
//     ])
//     .sort({ [sortField]: sortOrder })
//     .skip(skip)
//     .limit(limit);

//   return result;
// };

// const getBestSellerProducts = async (limit = 6) => {
//   // Get sold products
//   const soldProducts = await productModel
//     .find({ soldQuantity: { $gt: 0 } })
//     .populate([
//       { path: "category" },
//       { path: "colors" },
//       { path: "brand" },
//     ]);

//   if (soldProducts.length > 0) {
//     // Shuffle and take random `limit` products
//     const shuffled = soldProducts.sort(() => Math.random() - 0.5);
//     return shuffled.slice(0, limit);
//   }

//   // If sold products are less than 5 → fill with latest products
//   const neededCount = Math.max(limit - soldProducts.length, 0);

//   const additionalProducts = await productModel
//     .find({
//       _id: { $nin: soldProducts.map((p) => p._id) },
//     })
//     .populate([
//       { path: "category" },
//       {
//         path: "colors",
//         populate: { path: "size" },
//       },
//       { path: "brand" },
//     ])
//     .sort({ createdAt: -1 })
//     .limit(neededCount);

//   return [...soldProducts, ...additionalProducts].slice(0, limit);
// };

const getBestSellerProducts = async (limit = 6) => {
  // Get sold products
  const soldProducts = await productModel
    .find({ soldQuantity: { $gt: 0 } })
    .populate([
      { path: "category" },
      { path: "colors" },
      { path: "brand" },
    ]);

  if (soldProducts.length > 0) {
    // Shuffle sold products and take random ones
    const shuffledSold = soldProducts.sort(() => Math.random() - 0.5);

    if (soldProducts.length >= limit) {
      // If we have enough sold products, just return random ones
      return shuffledSold.slice(0, limit);
    }

    // If sold products are less than limit → add more random products
    const neededCount = limit - soldProducts.length;

    const additionalProducts = await productModel
      .find({
        _id: { $nin: soldProducts.map((p) => p._id) },
      })
      .populate([
        { path: "category" },
        {
          path: "colors",
          populate: { path: "size" },
        },
        { path: "brand" },
      ])
      .sort({ createdAt: -1 })
      .limit(neededCount);

    return [...shuffledSold, ...additionalProducts];
  }

  // If no sold products → just return latest products
  return await productModel
    .find()
    .populate([
      { path: "category" },
      {
        path: "colors",
        populate: { path: "size" },
      },
      { path: "brand" },
    ])
    .sort({ createdAt: -1 })
    .limit(limit);
};



const getTrendingProducts = async (limit = 6) => {
  // ✅ Find only products labeled as "Trending"
  const trendingProducts = await productModel
    .find({ labels: "Trending" })
    .populate([
      { path: "category" },
      {
        path: "colors",
        populate: { path: "size" },
      },
      { path: "brand" },
    ])
    .sort({ createdAt: -1 }) // newest trending first
    .limit(limit);

  return trendingProducts;
};





const getAllProductByBDWithPagination = async (
  query: Record<string, unknown>,
) => {
  // Get sort options
  const { sortField, sortOrder } = getSortOptions(query.sortBy as string);

  // Get pagination options
  const { skip, limit, page } = getPaginationOptions(query);

  const filters = await QueryBuilder(query);

  // ✅ Price range filter
  const minPrice = Number(query.minPrice);
  const maxPrice = Number(query.maxPrice);
  if (!isNaN(minPrice) || !isNaN(maxPrice)) {
    filters.price = {}; // add the price object
    if (!isNaN(minPrice))
      (filters.price as Record<string, number>).$gte = minPrice;
    if (!isNaN(maxPrice))
      (filters.price as Record<string, number>).$lte = maxPrice;
  }

  // ✅ Fetch data with pagination
  const [result, total] = await Promise.all([
    productModel
      .find(filters)
      .populate([
        { path: 'category',
         },
        {
          path: 'colors',
          populate: { path: 'size' },
        },
        { path: 'brand' },
      ])
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit),
    productModel.countDocuments(filters),
  ]);

  // ✅ Return structured response
  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};



const getSingleProductByBD = async (id: string) => {
  const result = await productModel.findById(id);
  return result;
};

const getSingleProductBySlug = async (slug: string) => {
  const result = await productModel.findOne({ slug }).populate([
      {
        path: 'category',
      },
      {
        path: 'colors',
        populate: {
        path: 'size',
      },
      },
      {
        path: 'brand',
      },
    ]);
  return result;
};


const getRelatedProducts = async (productId: string, limit = 8) => {
  const product = await productModel.findById(productId);

  if (!product) {
    return [];
  }

  // Build filter for related products
  const filters: Record<string, unknown> = {
    _id: { $ne: product._id },
    $or: [
      { category: product.category },
      { brand: product.brand },
    ],
  };

  const relatedProducts = await productModel
    .find(filters)
    .populate([
      { path: "category" },
      {
        path: "colors",
        populate: { path: "size" },
      },
      { path: "brand" },
    ])
    .limit(limit);

  return relatedProducts;
};

const getRelatedProductsBySlug = async (slug: string, limit = 8) => {
  // Find the product by slug
  const product = await productModel.findOne({ slug });

  if (!product) {
    return [];
  }

  // Build filter for related products
  const filters: Record<string, unknown> = {
    _id: { $ne: product._id }, // exclude current product
    $or: [
      { category: product.category },
      { brand: product.brand },
    ],
  };

  const relatedProducts = await productModel
    .find(filters)
    .populate([
      { path: "category" },
      {
        path: "colors",
        populate: { path: "size" },
      },
      { path: "brand" },
    ])
    .limit(limit);

  return relatedProducts;
};






const updateSingleProductByBD = async (id: string, updateProduct: TProduct) => {
  const result = await productModel.findByIdAndUpdate(id, updateProduct, {
    new: true,
  });
  return result;
};

const deleteSingleProductByBD = async (id: string) => {
  const result = await productModel.findByIdAndDelete(id);
  return result;
};

export const productService = {
  createProductByBD,
  getAllProductByBD,
  getAllProductByBDWithPagination,
  getSingleProductByBD,
  getSingleProductBySlug,
  updateSingleProductByBD,
  deleteSingleProductByBD,
  getNewArrivalProducts,
  getDiscountProducts,
  getBestSellerProducts,
  getTrendingProducts,
  getRelatedProducts,
  getRelatedProductsBySlug
};

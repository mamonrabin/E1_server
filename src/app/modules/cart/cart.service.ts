
import { TCart } from './cart.interface';
import { cartModel } from './cart.model';

const createCartByBD = async (cart: TCart) => {
  const result = await cartModel.create(cart);
  return result;
};






// export const createCartByBD = async (req: Request, res: Response) => {
//   try {
//     const { userRef, productRef, quantity } = req.body;

//     // If no userRef → guest cart, skip DB save
//     if (!userRef) {
//       return res.status(200).json({ message: "Guest cart saved locally only." });
//     }

//     // Check if cart item already exists for this user and product
//     const existingCart = await cartModel.findOne({ userRef, productRef });

//     if (existingCart) {
//       existingCart.quantity += quantity || 1; // increment quantity
//       await existingCart.save();
//       return res.status(200).json(existingCart);
//     }

//     // Create new cart document
//     const newCart = await cartModel.create({
//       userRef,
//       productRef,
//       quantity: quantity || 1,
//     });

//     res.status(201).json(newCart);
//   } catch (error) {
//     console.error("Error creating cart:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


const getAllCartByBD = async () => {
  const result = await cartModel.find().populate([
      {
        path: 'productRef',
        populate: {
        path: 'colors',

        populate:{
          path:'size'
        }
      },
      },
      
      {
        path: 'userRef',
      },
    ]);;
  return result;
};

const getAllCartByUserBD = async (userId: string) => {
  const result = await cartModel.find({ userRef: userId }).populate([
    {
      path: "productRef",
      populate: {
        path: "colors",
        populate: {
          path: "size",
        },
      },
    },
    {
      path: "userRef",
    },
  ]);
  return result;
};
        
const getSingleCartByBD = async (id: string) => {
  const result = await cartModel.findById(id);
  return result;
};

const updateSingleCartByBD = async (id: string, updateCart: TCart) => {
  const result = await cartModel.findByIdAndUpdate(id, updateCart, {
    new: true,
  });
  return result;
};

const deleteSingleCartByBD = async (id: string) => {
  const result = await cartModel.findByIdAndDelete(id);
  return result;
};

export const cartService = {
  createCartByBD,
  getAllCartByBD,
  getSingleCartByBD,
  updateSingleCartByBD,
  deleteSingleCartByBD,
  getAllCartByUserBD
};

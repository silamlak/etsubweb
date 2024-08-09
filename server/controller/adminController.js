import offerModel from "../models/offerModel.js";
import serviceModel from "../models/serviceModel.js";
import purchasedModel from "../models/purchaseModel.js";
import catagorieModel from "../models/catagorieModel.js";
import { validationResult } from "express-validator";
import mongoSanitize from "mongo-sanitize";
import userModel from "../models/userModel.js";

//services
export const addService = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const sanitizedData = mongoSanitize(req.body);
    const { price, discount } = sanitizedData;

    const discountedPrice = discount
      ? price - price * 0.1 * (discount / 100)
      : 0;

    const newService = serviceModel({
      ...sanitizedData,
      discountPrice: discountedPrice,
    });

    await newService.save();
    res.status(201).json({ msg: "New Service Created", newService });
  } catch (error) {
    next(error);
  }
};

export const getService = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category || "";

    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const services = await serviceModel.find(query).skip(skip).limit(limit).sort({createdAt: -1})

    const totalCount = await serviceModel.countDocuments(query);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
      services: services,
    });
  } catch (error) {
    next(error);
  }
};

export const ViewService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const service = await serviceModel.findById(id);
    if (!service) return res.status(400).json({ msg: "Service Not Found" });
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const sanitizedData = mongoSanitize(updatedData);

    if (sanitizedData.price) {
      const fractionOfPrice = sanitizedData.price * 0.1;
      const discountAmount = fractionOfPrice * (sanitizedData.discount / 100);

      const discountPrice = sanitizedData.price - discountAmount;

      // Include the discount in the update data
      sanitizedData.discountPrice = discountPrice;
    }
    const updatedService = await serviceModel.findByIdAndUpdate(
      id,
      {
        $set: sanitizedData,
      },
      { new: true }
    );
    if (!updatedService) {
      return res.status(400).json({ msg: "Service Not Found" });
    }
    res.status(200).json({ msg: "Service Updated", updatedService });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedService = await serviceModel.findByIdAndDelete(id);
    if (!deletedService)
      return res.status(400).json({ msg: "Service Not Found" });
    res.status(200).json({ msg: "Service Deleted" });
  } catch (error) {
    next(error);
  }
};

export const removeDiscount = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateDiscount = await serviceModel.findByIdAndUpdate(
      id,
      {
        $set: { discount: 0, discountPrice: 0 },
      },
      { new: true }
    );
    if (!updateDiscount)
      return res.status(400).json({ msg: "Service Not Found" });
    res.status(200).json({ msg: "Discount Removed", updateDiscount });
  } catch (error) {
    next(error);
  }
};

export const updateDiscount = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sanitizedData = mongoSanitize(req.body);
    const { price, discount } = sanitizedData;
    const discountedPrice = price - price * 0.1 * (discount / 100);

    const updateDiscount = await serviceModel.findByIdAndUpdate(
      id,
      {
        $set: { discount, discountPrice: discountedPrice },
      },
      { new: true }
    );
    if (!updateDiscount)
      return res.status(400).json({ msg: "Service Not Found" });
    res.status(200).json({ msg: "Discount Updated", updateDiscount });
  } catch (error) {
    next(error);
  }
};

//offer
export const addOffer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const sanitizedData = mongoSanitize(req.body);

    const newOffer = offerModel(sanitizedData);

    await newOffer.save();
    res.status(201).json({ msg: "New Offer Created", newOffer });
  } catch (error) {
    next(error);
  }
};

export const updateOffer = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const sanitizedData = mongoSanitize(updatedData);
    const updatedOffer = await offerModel.findByIdAndUpdate(
      id,
      {
        $set: sanitizedData,
      },
      { new: true }
    );
    if (!updatedOffer) {
      return res.status(400).json({ msg: "Offer Not Found" });
    }
    res.status(200).json({ msg: "Offer Updated", updatedOffer });
  } catch (error) {
    next(error);
  }
};

export const deleteOffer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedOffer = await offerModel.findByIdAndDelete(id);
    if (!deletedOffer) return res.status(400).json({ msg: "Offer Not Found" });
    res.status(200).json({ msg: "Offer Deleted" });
  } catch (error) {
    next(error);
  }
};

export const getOffer = async (req, res, next) => {
  try {
    const offers = await offerModel.find();
    if (!offers) return res.status(400).json({ msg: "No Offer Found" });
    res.status(200).json(offers);
  } catch (error) {
    next(error);
  }
};

export const ViewOffer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const offer = await offerModel.findById(id);
    if (!offer) return res.status(400).json({ msg: "Offer Not Found" });
    res.status(200).json(offer);
  } catch (error) {
    next(error);
  }
};

// catagories
export const getCatagorie = async (req, res, next) => {
  try {
    const catagorie = await catagorieModel.find().sort({createdAt: -1})
    if (!catagorie) return res.status(400).json({ msg: "No Catagorie Found" });
    res.status(200).json(catagorie);
  } catch (error) {
    next(error);
  }
};

export const ViewCatagorie = async (req, res, next) => {
  const { id } = req.params;
  try {
    const catagorie = await catagorieModel.findById(id);
    if (!catagorie) return res.status(400).json({ msg: "Catagorie Not Found" });
    const services = await serviceModel.find({ category: catagorie.title });
    const all = {
      ...catagorie._doc,
      services: services,
    };
    res.status(200).json({ catagorie, services });
  } catch (error) {
    next(error);
  }
};

export const addCatagorie = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const sanitizedData = mongoSanitize(req.body);

    const newCatagorie = catagorieModel(sanitizedData);

    await newCatagorie.save();
    res.status(201).json({ msg: "New Catagorie Created", newCatagorie });
  } catch (error) {
    next(error);
  }
};

export const updateCatagorie = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const sanitizedData = mongoSanitize(updatedData);
    const updatedCatagorie = await catagorieModel.findByIdAndUpdate(
      id,
      {
        $set: sanitizedData,
      },
      { new: true }
    );
    if (!updatedCatagorie) {
      return res.status(400).json({ msg: "Catagorie Not Found" });
    }
    res.status(200).json({ msg: "Catagorie Updated", updatedCatagorie });
  } catch (error) {
    next(error);
  }
};

export const deleteCatagorie = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCatagorie = await catagorieModel.findByIdAndDelete(id);
    if (!deletedCatagorie)
      return res.status(400).json({ msg: "Catagorie Not Found" });
    res.status(200).json({ msg: "Catagorie Deleted" });
  } catch (error) {
    next(error);
  }
};

//purchase
export const getPurchased = async (req, res, next) => {
  try {
    const counts = await purchasedModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const statusCounts = counts.reduce((acc, { _id, count }) => {
      acc[_id] = count;
      return acc;
    }, {});

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category || "Pending";
    const date = req.query.date ? new Date(req.query.date) : null;
    const minPrice = parseFloat(req.query.minPrice) || null;

    const skip = (page - 1) * limit;

    let query = {};
    if (date) {
      // Create a date range for the entire day
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));

      query.createdAt = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    if (minPrice !== null) {
      query.totalPrice = { $gte: minPrice };
    }

    if (search) {
      query.category = { $regex: search, $options: "i" };
    }

    if (category) {
      query.status = category;
    }
console.log(category);
    const orders = await purchasedModel.find(query).skip(skip).limit(limit);
    const userIds = [...new Set(orders.map((order) => order.userId))];
    const users = await userModel.find({ _id: { $in: userIds } }).exec();
    const userMap = new Map(users.map((user) => [user._id.toString(), user]));
    const ordersWithUsers = orders.map((order) => ({
      ...order.toObject(),
      user: userMap.get(order.userId.toString()) || null,
    }));
    const totalCount = await purchasedModel.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    if (!orders) return res.status(400).json({ msg: "No Service Found" });
    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
      ordersWithUsers,
      statusCounts,
    });
  } catch (error) {
    next(error);
  }
};

export const ViewPurchased = async (req, res, next) => {
  const { id } = req.params;
  try {
    const service = await purchasedModel.findById(id);
    if (!service) return res.status(400).json({ msg: "Service Not Found" });
    const user = await userModel.findOne({_id: service.userId})
    const allinone = {
      service,
      user
    }
    res.status(200).json(allinone);
  } catch (error) {
    next(error);
  }
};

export const deletePurchased = async (req, res, next) => {
  try {
    const ids = req.body.ids
    console.log(ids);
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ msg: "No IDs provided" });
    }
    const result = await purchasedModel.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "No files found to delete" });
    }
    res.status(200).json({
      msg: "Files deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//customer
export const getCustomers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    // const category = req.query.category || "Pending";
    const date = req.query.date ? new Date(req.query.date) : null;
    const minPrice = parseFloat(req.query.minPrice) || null;

    const skip = (page - 1) * limit;

    let query = {};
    if (date) {
      // Create a date range for the entire day
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));

      query.createdAt = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    if (minPrice !== null) {
      query.total_price = { $gte: minPrice };
    }
console.log(search)
    if (search) {
      query.first_name = { $regex: search, $options: "i" };
    }
    // if (search) {
    //   query.father_name = { $regex: search, $options: "i" };
    // }
    // if (search) {
    //   query.email = { $regex: search, $options: "i" };
    // }

    // if (category) {
    //   query.status = category;
    // }
    const users = await userModel.find(query).skip(skip).limit(limit);
    const totalCount = await userModel.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    if (!users) return res.status(400).json({ msg: "No Customer Found" });
    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomers = async (req, res, next) => {
  try {
    const ids = req.body.ids;
    console.log(ids);
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ msg: "No IDs provided" });
    }
    const result = await userModel.deleteMany({ _id: { $in: ids } });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "No files found to delete" });
    }
    res.status(200).json({
      msg: "Files deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const ViewCustomer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) return res.status(400).json({ msg: "Customer Not Found" });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
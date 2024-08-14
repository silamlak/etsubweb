import offerModel from "../models/offerModel.js";
import serviceModel from "../models/serviceModel.js";
import { custom_error_handler } from "../errorHandler/errorHandler.js";
import purchaseModel from "../models/purchaseModel.js";
import { validationResult } from "express-validator";
import mongoSanitize from "mongo-sanitize";
import userModel from "../models/userModel.js";
import paymentModel from "../models/paymentModel.js";
import catagorieModel from '../models/catagorieModel.js'
import mongoose from "mongoose";

export const getoffers = async (req, res, next) => {
  try {
    const offers = await offerModel.find();
    if (!offers) {
      return next(custom_error_handler(404, "No Offer List Found"));
    }
    res.status(200).json(offers);
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

export const purchaseItem = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!req?.user) return res.status(401).json({ msg: "please login" });
    const sanitizedData = mongoSanitize(req?.body?.form);
    const { state, forms } = sanitizedData;
    await userModel.findByIdAndUpdate(
      req.user,
      {
        $inc: { total_price: state?.totalPrice },
      },
      { session }
    );
    const payment = paymentModel({
      userId: req.user,
      ...forms,
    });
    const payId = await payment.save({ session });

    const purchaseItem = purchaseModel({
      userId: req.user,
      paymentId: payId._id,
      ...state,
    });

    await purchaseItem.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ msg: "Item Ordered" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
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

    const services = await serviceModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 });

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

export const getNewService = async (req, res, next) => {
  try {
    console.log('hello')
    const newServices = await serviceModel.find().sort({updatedAt: -1}).limit(10)
    if(!newServices) return res.status(404).json({msg: 'no new Services found'})
      res.status(200).json(newServices)
  } catch (error) {
    next(error)
  }
}

export const getOrderdService = async (req, res, next) => {
  try {
    if(!req?.user) return res.status(401).json({ msg: "Please Login" });
    const orders = await purchaseModel.find({userId: req?.user}).sort({createdAt: -1})
        if (!orders || orders.length === 0)
          return res.status(404).json({ msg: "No Order Found" });

        // Extract all service IDs from the orders
        const serviceIds = orders.map((order) => order.serviceId);

        // Fetch service details for all service IDs
        const services = await serviceModel.find({ _id: { $in: serviceIds } });

        // Create a map of serviceId to service details for quick lookup
        const serviceMap = services.reduce((map, service) => {
          map[service._id] = service;
          return map;
        }, {});

        // Combine orders with corresponding service details
        const ordersWithServices = orders.map((order) => ({
          ...order._doc, // Spread order properties
          service: serviceMap[order.serviceId] || null, // Add service details
        }));

        res.status(200).json(ordersWithServices);
  } catch (error) {
    next(error)
  }
}

export const searchItems = async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query)
    if (!query)
      return res.status(400).json({ msg: "Query parameter is required" });

    const results = await serviceModel.find({
      name: { $regex: query, $options: "i" }, // Case-insensitive search
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const category = await catagorieModel.find();
    if (!category) {
      return next(custom_error_handler(404, "No Category List Found"));
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
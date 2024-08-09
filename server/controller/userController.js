import offerModel from '../models/offerModel.js'
import serviceModel from '../models/serviceModel.js'
import {custom_error_handler} from '../errorHandler/errorHandler.js'
import purchaseModel from '../models/purchaseModel.js'
import { validationResult } from 'express-validator'
import mongoSanitize from "mongo-sanitize";
import userModel from '../models/userModel.js'


export const getoffers = async (req, res, next) => {
    try {
        const offers = await offerModel.find()
        if (!offers) {
            return next(custom_error_handler(404, 'No Offer List Found'))
        }
        res.status(200).json(offers)
    } catch (error) {
        next(error)
    }
}

export const getService = async (req, res, next) => {
  try {
    const services = await serviceModel.find();
    if (!services) return res.status(400).json({ msg: "No Service Found" });
    res.status(200).json(services);
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
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const sanitizedData = mongoSanitize(req.body);
    const { userId, totalPrice } = sanitizedData;
     await userModel.findByIdAndUpdate(userId, {
       $inc: { total_price: totalPrice },
     });

    const purchaseItem = purchaseModel(sanitizedData);

    await purchaseItem.save();
    res.status(201).json({ msg: "Item Purchased", purchaseItem });
  } catch (error) {
    next(error);
  }
};

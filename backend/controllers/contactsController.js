import { Contact } from "../models/contactsModel.js";
import { User } from '../models/usersModel.js';
// prettier-ignore
import { contactValidation, favoriteValidation } from "../validations/validation.js";
import { httpError } from "../helpers/httpError.js";
import 'dotenv/config';
const { ACCESS_TOKEN, PROJECT_ID } = process.env;
import TheAuthAPI from "theauthapi";

const theAuthAPI = new TheAuthAPI(ACCESS_TOKEN);

const retrieveKey = async (req, res) => {
  const { apiKey } = req.user;
  res.json(apiKey);
};

const createAPIkey = async (req, res, next) => {
  const { name, customMetaData, customAccountId } = req.body;
  try {
    //console.log(req.body);
    const key = await theAuthAPI.apiKeys.createKey({
      projectId: PROJECT_ID,
      customMetaData: { metadata_val: customMetaData },
      customAccountId: customAccountId,
      name: name,
    });
    console.log('Key created > ', key);
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { apiKey: key.key });
    res.json(key);
  } catch (error) {
    console.log("Couldn't make the key ", error);
    next(error);
  }
};


const createApiKey = async (req, res) => {
   try {
     const { data } = await axios.post(apiUrl + '/api-keys', apiKey, {
       headers: {
         ContentType: 'application/json',
         'x-api-key': accessKey,
       },
     });
     return data;
   } catch (error) {
     if (error.response) {
       console.log(error.response.data);
     } else {
       // handle other errors
     }
   }
};

const getAllContacts = async (req, res) => {
  //const { page = 1, limit = 20, favorite } = req.query;
  //const query = favorite ? { favorite: true } : {};
  //const result = await Contact.find(query)
    //.skip((page - 1) * limit)
  //.limit(parseInt(limit));
  const { _id } = req.user
  const contacts = await Contact.find({ owner: _id });
  res.json(contacts);

};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw httpError(404, "Contact ID Not Found");
  }

  res.json(result);
};

const addContact = async (req, res) => {
  // Preventing lack of necessary data for contacts (check validations folder)
  const { _id } = req.user;
  const { error } = contactValidation.validate(req.body);

  if (error) {
    throw httpError(400, "missing required fields");
  }

  const result = await Contact.create({ ...req.body, owner:_id });

  res.status(201).json(result);
};
const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw httpError(404);
  }

  res.json(contactId);
};

const updateContactById = async (req, res) => {
  // Preventing lack of necessary data for contacts (check validations folder)
  const { error } = contactValidation.validate(req.body);
  if (error) {
    throw httpError(400, "missing fields");
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404);
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  // Preventing lack of necessary data for favorite (check validations folder)
  const { error } = favoriteValidation.validate(req.body);
  if (error) {
    throw httpError(400, "missing field favorite");
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404);
  }

  res.json(result);
};

// prettier-ignore
export {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateStatusContact,
  retrieveKey,
  createAPIkey,
};                                        
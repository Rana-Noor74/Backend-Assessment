const express = require("express");
const knex = require("knex");
const { processMessage } = require("../utilities/StreamManager");
const { initProducer } = require("../utilities/producer");
const { initConsumer } = require("../utilities/consumer");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

module.exports = {
  //initial controllers
  index: (req, res) => {
    res
      .status(200)
      .json({ message: `App is running on port. ${process.env.PORT || 4000}` });
  },

  test: (req, res) => {
    res.status(200).json({ message: `This is test route` });
    
  },

  getAllTenants: async (req, res) => {
    try {
      const tenants = await db("Tenant_Profile").select("*");
      res.json({ success: 1, data: tenants });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to get tenant profiles", errorLog: err });
    }
  },

  createTenant: async (req, res) => {
    const obj = {
      tenant_name: req.body.tenant_name,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      zip_code: req.body.zip_code,
      phone: req.body.phone,
      web_url: req.body.web_url,
      state : req.body.state,
    };
    try {
      // Insert the new tenant into the Tenant_Profile table
      const newTenant = await db("Tenant_Profile").insert(obj);
      // Return the inserted tenant data as the response
      res
        .status(201)
        .json({ message: "Tenant created successfully", data: newTenant });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to create a new tenant", errorLog: err });
    }
  },

  getTenantById: async (req, res) => {
    const tenantId = req.params.tenantId;
    try {
      const tenant = await db("Tenant_Profile")
        .where({ tenant_id: tenantId })
        .first();
      if (!tenant) {
        return res.status(404).json({ error: "Tenant not found" });
      }
      res.json(tenant);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to get tenant profile", errorLog: err });
    }
  },

  updateTenant: async (req, res) => {
    const tenantId = req.params.tenantId;
    const updateObj = {
      tenant_name: req.body.tenant_name,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      zip_code: req.body.zip_code,
      phone: req.body.phone,
      web_url: req.body.web_url,
      state : req.body.state,
    };

    try {
      const updatedRows = await db("Tenant_Profile")
        .where({ tenant_id: tenantId })
        .update(updateObj);
      if (updatedRows === 0) {
        return res.status(404).json({ error: "Tenant not found" });
      }
      res.json({ message: "Tenant updated successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to update tenant", errorLog: err });
    }
  },

  deleteTenant: async (req, res) => {
    const tenantId = req.params.tenantId;
    try {
      const deletedRows = await db("Tenant_Profile")
        .where({ tenant_id: tenantId })
        .del();
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Tenant not found" });
      }
      res.json({ message: "Tenant deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete tenant", errorLog: err });
    }
  },

  createUser: async (req, res) => {
    const obj = {
      "first_name" : req.body.first_name,
      "last_name" : req.body.last_name,
      "department" : req.body.department,
      "designation" : req.body.designation,
      "tenant_id" : req.body.tenant_id,
      "image_url" : req.body.image_url,
      "city" : req.body.city,
      "country" : req.body.country,
      "bio" : req.body.bio,
      "social_links" : req.body.social_links,
      "employee_id" : req.body.employee_id,
    };
    try {
      const newUserProfile = await db("User_Profile").insert(obj);
      res.status(201).json({message: "User profile created successfully", userProfileId: newUserProfile[0]});
    } catch (err) {
      res.status(500).json({ error: "Failed to create a new user profile", errorLog: err });
    }
  },
  getAllUsers : async (req, res) => {
      try {
          const userProfiles = await db('User_Profile').select('*');
          res.json({"success" : 1, messsage : userProfiles});
      } catch (err) {
          res.status(500).json({ error: 'Failed to get user profiles', errorLog: err });
      }
  },
  getUserById: async (req, res) => {
      try {
          const userId = req.params.userId;
          const userProfile = await db('User_Profile').where({ user_id: userId }).first();
          if (userProfile) {
              res.json(userProfile);
          } else {
              res.status(404).json({ error: 'User profile not found' });
          }
      } catch (err) {
          res.status(500).json({ error: 'Failed to get user profile', errorLog: err });
      }
  },
  updateUser: async (req, res) => {
      try {
          const userId = req.params.userId;
          const updateObj = {
            "first_name" : req.body.first_name,
            "last_name" : req.body.last_name,
            "department" : req.body.department,
            "designation" : req.body.designation,
            "tenant_id" : req.body.tenant_id,
            "image_url" : req.body.image_url,
            "city" : req.body.city,
            "country" : req.body.country,
            "bio" : req.body.bio,
            "social_links" : req.body.social_links,
            "employee_id" : req.body.employee_id,
          };
          const updatedUserProfile = await db('User_Profile').where({ user_id: userId }).update(updateObj);
          if (updatedUserProfile) {
              res.json({ message: 'User profile updated successfully' });
          } else {
              res.status(404).json({ error: 'User profile not found' });
          }
      } catch (err) {
          res.status(500).json({ error: 'Failed to update user profile', errorLog: err });
      }
  },
  deleteUser: async (req, res) => {
      try {
          const userId = req.params.userId;
          const deletedUserProfile = await db('User_Profile').where({ user_id: userId }).del();
          if (deletedUserProfile) {
              res.json({ message: 'User profile deleted successfully' });
          } else {
              res.status(404).json({ error: 'User profile not found' });
          }
      } catch (err) {
          res.status(500).json({ error: 'Failed to delete user profile', errorLog: err });
      }
  },
};

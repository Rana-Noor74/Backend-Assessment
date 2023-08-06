const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

//initial routes to test the app
router.route("/").get(controller.index);
router.route("/test-route").get(controller.test);

// tenants endpoints
router.route("/tenants").get(controller.getAllTenants);
router.route("/tenants").post(controller.createTenant);
router.route("/tenants/:tenantId").get(controller.getTenantById);
router.route("/tenants/:tenantId").patch(controller.updateTenant);
router.route("/tenants/:tenantId").delete(controller.deleteTenant);

// user endpoints
router.route("/users").get(controller.getAllUsers);
router.route("/users").post(controller.createUser);
router.route("/users/:userId").get(controller.getUserById);
router.route("/users/:userId").patch(controller.updateUser);
router.route("/users/:userId").delete(controller.deleteUser);


module.exports = router;
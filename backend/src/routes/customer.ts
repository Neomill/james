import { Router } from "express";
import CustomerController from "../controllers/CustomerController";
import { body } from "express-validator";
import checkPermissions from "../middlewares/checkPermissions";
const router = Router();

router.get(
  "/",
  checkPermissions("read-customer"),
  CustomerController.getAll
);
router.get(
  "/search",
  checkPermissions("read-customer"),
  CustomerController.search
);
router.get(
  "/:id",
  checkPermissions("read-customer"),
  CustomerController.getOne
);
router.post(
  "/",
  body("lname").isString().notEmpty(),
  body("fname").isString().notEmpty(),
  body("mname").isString().notEmpty(),
  body("phone").isString().notEmpty(),
  body("address").isString().notEmpty(),
  checkPermissions("create-customer"),
  CustomerController.create
);
router.put(
  "/:id",
  body("lname").isString().optional(),
  body("fname").isString().optional(),
  body("mname").isString().optional(),
  body("phone").isString().optional(),
  body("address").isString().optional(),
  checkPermissions("update-customer"),
  CustomerController.update
);
router.delete(
  "/:id",
  checkPermissions("delete-customer"),
  CustomerController.delete
);

export default router;

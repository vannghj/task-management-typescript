import express, {Request, Response, Router} from "express";
import * as controller from "../controllers/task.controller"
import * as authMiddleware from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/",authMiddleware.requireAuth, controller.index);
router.get("/detail/:id",authMiddleware.requireAuth, controller.detail);
router.patch("/change-status/:id",authMiddleware.requireAuth, controller.changeStatus);
router.patch("/change-multi",authMiddleware.requireAuth, controller.changeMulti);
router.post("/create",authMiddleware.requireAuth, controller.create);
router.patch("/edit/:id",authMiddleware.requireAuth, controller.edit);
router.delete("/delete/:id",authMiddleware.requireAuth, controller.deleteTask);

export const taskRoutes = router;


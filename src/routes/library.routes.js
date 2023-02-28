import { Router } from "express";
import { methods as libraryController } from "../controllers/library.controller";

const router = Router();

router.get("/", libraryController.getBooks);
router.get("/:id", libraryController.getBook);
router.post("/", libraryController.addBook);
router.delete("/:id", libraryController.deleteBook);
router.put("/:id", libraryController.updateBook);

export default router;
import express from "express";
import { createLesson, expandLessonSection } from "../controllers/lesson.controller";


const router = express.Router();

router.post("/generate", createLesson);
router.post("/expand", expandLessonSection);


export default router;

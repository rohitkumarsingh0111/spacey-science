import { Request, Response } from "express";
import { generateLesson, expandLesson } from "../services/lesson.service";

/* ========================
   GENERATE LESSON
======================== */

export const createLesson = async (req: Request, res: Response) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        error: "Topic is required",
      });
    }

    const lesson = await generateLesson(topic);

    return res.status(200).json({
      success: true,
      data: lesson,
    });

  } catch (error: any) {
    console.error("Lesson Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to generate lesson",
    });
  }
};


/* ========================
   EXPAND LESSON SECTION
======================== */

export const expandLessonSection = async (req: Request, res: Response) => {
  try {
    const { section } = req.body;

    if (!section?.content) {
      return res.status(400).json({
        success: false,
        error: "Section content is required",
      });
    }

    const expandedText = await expandLesson(section.content);

    return res.status(200).json({
      success: true,
      data: expandedText,
    });

  } catch (error: any) {
    console.error("Expand Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to expand lesson",
    });
  }
};

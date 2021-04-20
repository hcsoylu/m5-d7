import express from "express";
import fs, { writeJSON } from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 } from "cloudinary";
import uniqid from "uniqid";

const dataFolder = join(dirname(fileURLToPath(import.meta.url)), "../data");
const booksPath = join(dataFolder, "books.json");
const commentsPath = join(dataFolder, "comments.json");

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "strive",
  },
});

const uploader = multer({ storage: cloudinaryStorage });

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const books = await fs.readJSON(booksPath);
    res.send(books);
  } catch (error) {
    next(error);
  }
});

router.get("/:asin", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.post("/", uploader.single("cover"), async (req, res, next) => {
  try {
    res.send({ cloudinaryURL: req.file.path });
  } catch (error) {
    next(error);
  }
});

router.post("/:asin/comments", async (req, res, next) => {
  try {
    const books = await fs.readJSON(booksPath);
    // const comments = await fs.readJSON(commentsPath);

    const moddedBooksArray = books.filter(
      (book) => book.asin !== req.params.asin
    );

    let selectedBook = books.find(book.asin === req.params.asin);

    if (!selectedBook) {
      err = new Error({ errMsg: "book not found" });
      err.httpStatusCode = 404;
      next(err);
    }
    const newComment = { ...req.body, _id: uniqid(), date: new Date() };
    const moddedBook = {
      ...selectedBook,
      comments: [...selectedBook.comments, newComment],
    };

    moddedBooksArray.push(moddedBook);
    await fs.writeJSON(booksPath, moddedBooksArray);

    res
      .status(201)
      .send({ msg: "Comment successfully updated!", data: { newComment } });

    res.send();
  } catch (error) {
    next(error);
  }
});

router.get("/:asin/comments", async (req, res, next) => {
  try {
    const comments = await fs.readJSON(commentsPath);
    const selectedComments = comments;
  } catch (error) {
    next(error);
  }
});

router.put("/:asin", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.delete("/:asin", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;

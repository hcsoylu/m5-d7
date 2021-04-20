import express from "express"
import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const dataFolder = join(dirname(fileURLToPath(import.meta.url)), "../data")
const booksPath = join(dataFolder, "books.json")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const books = await fs.readJSON(booksPath)
    res.send(books)
  } catch (error) {
    next(error)
  }
})

router.get("/:asin", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

router.put("/:asin", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

router.delete("/:asin", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})

export default router

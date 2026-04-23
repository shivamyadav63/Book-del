 import express from "express"
import { getBooks } from "../controller/book.controller.js";

 const route = express.Router();

 route.get("/", getBooks)

 export default route;
import { Router } from "express";
import { conf } from "../controllers/user.js";

export let router = Router();

router.post("/", conf);

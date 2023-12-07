import express from "express";
import { ValidationError } from "yup";

import prisma from "../../../prisma/prisma.js";
import cleanUserInput from "../../../services/cleanUserInput.js";

const unicornsRouter = new express.Router();

unicornsRouter.get("/", async (req, res) => {
  try {
    const unicorns = await prisma.unicorn.findMany();
    return res.status(200).json({ unicorns });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

unicornsRouter.post("/", async (req, res) => {
  const { body } = req;
  console.log("body: ", body);

  const cleanedUnicorn = cleanUserInput(body);
  console.log("cleaned form input:", cleanedUnicorn);

  try {
    const newUnicorn = await prisma.unicorn.create({ data: cleanedUnicorn });
    console.log(newUnicorn);
    return res.status(201).json({ newUnicorn });
    // if persisting is successful, send the newly persisted unicorn back to the frontend to display!
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.errors });
      // check specifically for ValidationErrors from yup to display
    }
    return res.status(500).json({ errors: error });
    // if there was any other error, send to the frontend for potential display
  }
});

unicornsRouter.get("/:id", async (req, res) => {
  try {
    const unicorn = await prisma.unicorn.findUnique({ where: { id: parseInt(req.params.id) } });
    return res.status(201).json({ unicorn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default unicornsRouter;

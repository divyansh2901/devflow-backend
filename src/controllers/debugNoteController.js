import prisma from "../config/prisma.js";

export const createDebugNote = async (req, res) => {
  try {
    const {
      title,
      issue,
      solution,
      tags,
    } = req.body;

    const note = await prisma.debugNote.create({
      data: {
        title,
        issue,
        solution,
        tags,
        userId: req.user.id,
      },
    });

    res.status(201).json(note);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getDebugNotes = async (req, res) => {
  try {
    const notes = await prisma.debugNote.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(notes);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getDebugNoteById = async (req, res) => {
  try {
    const note = await prisma.debugNote.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    });

    if (!note) {
      return res.status(404).json({
        message: "Debug note not found",
      });
    }

    res.status(200).json(note);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateDebugNote = async (req, res) => {
  try {
    const note = await prisma.debugNote.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    });

    if (!note) {
      return res.status(404).json({
        message: "Debug note not found",
      });
    }

    const updated = await prisma.debugNote.update({
      where: {
        id: note.id,
      },
      data: req.body,
    });

    res.status(200).json(updated);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteDebugNote = async (req, res) => {
  try {
    const note = await prisma.debugNote.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    });

    if (!note) {
      return res.status(404).json({
        message: "Debug note not found",
      });
    }

    await prisma.debugNote.delete({
      where: {
        id: note.id,
      },
    });

    res.status(200).json({
      message: "Debug note deleted",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
import prisma from "../config/prisma.js";

export const createSnippet = async(req,res) => {
    try {
        const {
            title,
            language,
            code,
            tags,
        } = req.body;

        const snippet = await prisma.snippet.create({
            data: {
                title,
                language,
                code,
                tags,
                userId: req.user.id,
            },
        });

        res.status(201).json(snippet);

    } catch (error) {
        console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
    }
};

export const getSnippets = async (req, res) => {
  try {
    const { language } = req.query;

    const snippets = await prisma.snippet.findMany({
      where: {
        userId: req.user.id,
        ...(language && { language }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(snippets);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

//    ... => dynamic filtering
//    it is injecting an object here => (here it is similar to if else)

export const getSnippetById = async (req, res) => {
  try {
    const snippet = await prisma.snippet.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    });

    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }

    res.status(200).json(snippet);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateSnippet = async (req, res) => {
  try {
    const existingSnippet =
      await prisma.snippet.findFirst({
        where: {
          id: Number(req.params.id),
          userId: req.user.id,
        },
      });

    if (!existingSnippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }

    const updatedSnippet =
      await prisma.snippet.update({
        where: {
          id: existingSnippet.id,
        },
        data: req.body,
      });

    res.status(200).json(updatedSnippet);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteSnippet = async (req, res) => {
  try {
    const snippet =
      await prisma.snippet.findFirst({
        where: {
          id: Number(req.params.id),
          userId: req.user.id,
        },
      });

    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }

    await prisma.snippet.delete({
      where: {
        id: snippet.id,
      },
    });

    res.status(200).json({
      message: "Snippet deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
import prisma from "../config/prisma.js";

export const createSession = async(req,res) => {
    try {
        const {
            topicWorked,
            duration,
            notes,
            projectId,
        } = req.body;

        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId: req.user.id,
            },
        });

        if(!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        const session = await prisma.session.create({
            data: {
                topicWorked,
                duration,
                notes,
                projectId,
                userId: req.user.id,
            },
        });

        res.status(201).json(session);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getSessions = async (req, res) => {
  try {
    const sessions = await prisma.session.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        project: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(sessions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await prisma.session.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
      include: {
        project: true,
      },
    });

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    res.status(200).json(session);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const session = await prisma.session.findFirst({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
    });

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    res.status(200).json({
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getSessionsByProject = async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: req.user.id,
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const sessions = await prisma.session.findMany({
      where: {
        projectId,
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(sessions);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
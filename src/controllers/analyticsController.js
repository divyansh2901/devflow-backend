import prisma from "../config/prisma.js";

export const getAnalytics = async (req, res) => {
  try {

    const userId = req.user.id;

    const totalProjects =
      await prisma.project.count({
        where: {
          userId,
        },
      });

    const totalSessions =
      await prisma.session.count({
        where: {
          userId,
        },
      });

    const totalSnippets =
      await prisma.snippet.count({
        where: {
          userId,
        },
      });

    const totalDebugNotes =
      await prisma.debugNote.count({
        where: {
          userId,
        },
      });

    const sessions =
      await prisma.session.findMany({
        where: {
          userId,
        },
      });

    const totalHours =
      sessions.reduce(
        (sum, session) =>
          sum + session.duration,
        0
      ) / 60;

    const projects =
      await prisma.project.findMany({
        where: {
          userId,
        },
        include: {
          sessions: true,
        },
      });

    let mostActiveProject = null;
    let maxSessions = 0;

    for (const project of projects) {
      if (
        project.sessions.length >
        maxSessions
      ) {
        maxSessions =
          project.sessions.length;

        mostActiveProject = {
          id: project.id,
          name: project.name,
          sessions:
            project.sessions.length,
        };
      }
    }

    res.status(200).json({
      totalProjects,
      totalSessions,
      totalHours,
      totalSnippets,
      totalDebugNotes,
      mostActiveProject,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
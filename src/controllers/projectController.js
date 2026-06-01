import prisma from "../config/prisma.js";

export const createProject = async(req,res) => {
    try {
        const {name, description, techStack} = req.body;

        const project = await prisma.project.create({
            date: {
                name,
                description,
                techStack,
                userId: req.user.id
            }
        });

        res.status(201).json(project);
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Server Error"});
    }
};

export const getProjects = async(req,res) => {
    try {
        const projects = await prisma.project.findMany({
            where: {
                userId: req.user.id
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        res.status(200).json(projects);
    } catch(error) {
        console.log(error);

        res.status(500).json({message: "Server Error"});
    }
};

export const getProjectById = async(req,res) => {
    try {
        const project = await prisma.project.findFirst({
            where: {
                id: Number(req.params.id),
                userId: req.user.id
            }
        });

        if(!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json(project);
    } catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

export const updateProject = async(req,res) => {
    try {
        const {name, description, techStack} = req.body;
        
        const existingProject = await prisma.project.findFirst({
            where: {
                id: Number(req.param.id),
                userId: req.user.id
            }
        });

        if(existingProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }
        const updatedProject = await prisma.project.update({
            where: {
                id: existingProject.id
            },
            data: {
                name,
                description,
                techStack
            }
        });

        res.status(200).json(updatedProject);

    } catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

export default deleteProject = async(req,res) => {
    try { 
        const project = await prisma.project.findFirst({
            where: {
                id: Number(req.params.id),
                userid: req.user.id
            }
        });

        if(!project){
            return res.status(404).json({
                message: "Project not found"
            });
        }

        await prisma.project.delete({
            where: {
                id: project.id
            }
        });

        res.status(200).json({
            message: "Project deleted successfully"
        });
    } catch(error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};
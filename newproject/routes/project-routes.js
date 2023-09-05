    const express = require("express")
    const router = express.Router()
    const Project = require("../model/project")
    const auth = require("../auth")
    const projectController = require("../controller/project-controller")
    const User = require("./user-routes")
    const userCont = require("../controller/user-controller")
    // const isAuthenticated = require("../isAuthenticated")
    router.get("/",projectController.getAllProjectsController)
    router.get("/:id", projectController.getProjectByIdController);
    router.post("/",projectController.createProjectController)

    router.post("/back/:id",auth.authMiddleware, async (req, res) => {
        try {
            console.log("Entering PUT /back/:id route");
            
            const projectId = req.params.id;
            console.log("Project ID:", projectId);
    
            const project = await Project.findById(projectId);
            console.log("Project:", project);
            console.log(req.user)
            const userId = req.user.id;
            console.log("User ID:", userId);
    
            const existingBacker = project.backers.find(backer => backer.toString() === userId);
            if (existingBacker) {
                console.log("User already liked the project");
                return res.status(400).json({
                    msg: "Project already liked by the user"
                });
            }
    
            project.backers.unshift(userId);
            await project.save();
            console.log("Project updated with new backer:", project);
    
            res.json(project.backers);
        } catch (err) {
            console.error("Error:", err.message);
            res.status(500).send("Server Error");
        }
    });
    
    
    // router.put("/removeBack",projectController.removeBackerController)

    // router.get("/:id",projectController.getById)
    router.get("/user-project/:id", projectController.getUserProjectsController);
    router.put("/:id",projectController.updateProjectController)
    router.delete("/:id",projectController.deleteProjectController)
    module.exports = router
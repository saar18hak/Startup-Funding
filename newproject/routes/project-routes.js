    const express = require("express")
    const router = express.Router()
    const Project = require("../model/project")
    const auth = require("../auth")
    const projectController = require("../controller/project-controller")
    const User = require("../model/user-model")
    const userCont = require("../controller/user-controller")
    // const isAuthenticated = require("../isAuthenticated")
    router.get("/",projectController.getAllProjectsController)
    router.get("/:id", projectController.getProjectByIdController);
    router.post("/",projectController.createProjectController)

    router.post("/back/:id",auth.authMiddleware, async (req, res) => {

        try {
            const backedAmount = req.body.backedAmount
            console.log(backedAmount)
            console.log("Entering PUT /back/:id route");
            
            const projectId = req.params.id;
            console.log("Project ID:", projectId);
    
            const project = await Project.findById(projectId);
            console.log("Project:", project);
            console.log(req.user)
            const userId = req.user.id;
            console.log("User ID:", userId);
            
            if (!project || !project.backers) {
                return res.status(404).json({
                    msg: "Project not found or backers array is missing",
                });
            }
    
            // Assuming you have user information in req.user
           
            const user = await User.findById(userId);
            if (user) {
              if (!user.backedProjects) {
                user.backedProjects = []; // Initialize the backedProjects array if it doesn't exist
              }
              user.backedProjects.push(projectId);
              await user.save();
            }
            
          
            project.backers.unshift({
                user:userId,
                backedAmount:backedAmount
            });
            await project.save();


            console.log("Project updated with new backer:", project);
    
            res.json(project.backers);
        } catch (err) {
            console.error("Error:", err.message);
            res.status(500).send("Server Error");
        }
    });
    
    // Add this route after your other routes
router.get("/backers/:id", async (req, res) => {
    try {
      const projectId = req.params.id;
      
      // Find the project by its ID
      const project = await Project.findById(projectId);
  
      if (!project || !project.backers) {
        return res.status(404).json({
          msg: "Project not found or backers array is missing",
        });
      }
  
      // Calculate the total backed amount by iterating through the backers array
      let totalBackedAmount = 0;
      for (const backer of project.backers) {
        totalBackedAmount += backer.backedAmount || 0;
      }
      
     

      res.json({
        totalBackedAmount,
        backers: project.backers,
      });
    } catch (err) {
      console.error("Error:", err.message);
      res.status(500).send("Server Error");
    }
  });
  
    // Create a new route for updating backed amount


    
    // router.put("/removeBack",projectController.removeBackerController)

    // router.get("/:id",projectController.getById)
    router.get("/user-project/:id", projectController.getUserProjectsController);
    router.put("/:id",projectController.updateProjectController)
    router.delete("/:id",projectController.deleteProjectController)
    module.exports = router
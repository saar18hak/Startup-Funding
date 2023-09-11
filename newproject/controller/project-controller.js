const mongoose = require("mongoose");
const ProjectModel = require("../model/project"); // Assuming you have a project model
const userModel = require("../model/user-model");


// GET ALL PROJECTS
exports.getAllProjectsController = async (req, res) => {
  try {
    const projects = await ProjectModel.find({}).populate("user");
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No Projects Found" });
    }
    return res.status(200).json({
      success: true,
      ProjectCount: projects.length,
      message: "All Projects list",
      projects,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error While Getting Projects",
      error,
    });
  }
};
// Get Project by ID
exports.getProjectByIdController = async (req, res) => {
    try {
      const { id } = req.params;
      const project = await ProjectModel.findById(id).populate("user");
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Project details",
        project,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Error in fetching project details",
        error,
      });
    }
  };
  
// Create Project
exports.createProjectController = async (req, res) => {
  try {
    const {
      category,
      title,
      subtitle,
      country,
      project_location,
      project_image,
      project_video,
      funding_goal,
      date_and_time,
      user, // Assuming this is the creator's user ID
    } = req.body;

    // Validation
    if (!category || !title || !subtitle || !country || !project_location || !project_image  || !funding_goal || !date_and_time || !user) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const existingUser = await userModel.findById(user);
    // Validation
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Unable to find user",
      });
    }

    const newProject = new ProjectModel({
      category,
      title,
      subtitle,
      country,
      project_location,
      project_image,
      project_video,
      funding_goal,
      date_and_time,
      user, // Assign the creator's user ID
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newProject.save({ session });
    existingUser.projects.push(newProject);
    await existingUser.save({ session });
    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Project Created!",
      newProject,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error While Creating Project",
      error,
    });
  }
};

// Update Project
exports.updateProjectController = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      if (!updatedProject) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Project Updated!",
        updatedProject,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Error While Updating Project",
        error,
      });
    }
  };
  
  // Delete Project
  exports.deleteProjectController = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProject = await ProjectModel.findByIdAndDelete(id);
      if (!deletedProject) {
        return res.status(404).json({
          success: false,
          message: "Project not found",
        });
      }
      // Assuming that the user's projects array should be updated
      const user = await userModel.findById(deletedProject.user);
      user.projects.pull(deletedProject);
      await user.save();
  
      return res.status(200).json({
        success: true,
        message: "Project Deleted!",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Error While Deleting Project",
        error,
      });
    }
  };
  
  // Get Projects by User ID
  exports.getUserProjectsController = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id).populate("projects");
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "User projects",
        projects: user.projects,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Error in fetching user projects",
        error,
      });
    }
  };
  


const userResumeModel = require("../model/Resume");
const { handleValidationError, validationErrorMessage } = require("../utils/errorHandler");

// Resume Title 
exports.resumeTitleCreated = async (req, res) => {
  const { resumeId, resumeTitle, userEmail, userName } = req.body;
  try {
    const validationError = validationErrorMessage(req, res);
    if (validationError) {
      return validationError;
    }

    const findResumeId = await userResumeModel.findOne({ resumeId: resumeId })

    if (findResumeId) {
      return res.status(400).json({
        status: false,
        message: "Resume ID already exists, please use a unique resume ID.",
        error: true,
      });
    } else {
      const updatedResume = await userResumeModel.create({ resumeId: resumeId, resumeTitle: resumeTitle, userEmail: userEmail, userName: userName })

      if (updatedResume) {
        return res.status(201).json({
          status: true,
          message: "Resume title created successfully",
          data: updatedResume,
          error: false,
        });
      } else {
        return res.status(500).json({
          status: true,
          message: "Resume title created failed",
          error: false,
        });
      }

    }
  } catch (err) {
    console.error("Resume Title Created Unexpected Error:__________", err);
    return res.status(500).json({
      status: false,
      message: err?.message || "Internal Server Error",
      error: true,
    });
  }
};


// Resume personal 
exports.resumeAddPersonalDetails = async (req, res) => {

  const { resumeId, firstName, lastName, jobTitle, address, phone, email, pincode, github, linkedin, portfolio, themeColor } = req.body;

  try {
    const validationError = validationErrorMessage(req, res);
    if (validationError) {
      return validationError;
    }

    const findResumeId = await userResumeModel.findOne({ resumeId: resumeId })
    console.log("findResumeId___________", findResumeId);

    if (findResumeId) {
      const updatedResume = await userResumeModel.findOneAndUpdate({ resumeId: resumeId },
        {
          $set: {
            personalDetails: { firstName, lastName, jobTitle, address, phone, pincode, email, github, linkedin, portfolio, themeColor }
          }
        },
        { new: true, upsert: true, runValidators: true }
      )
      console.log("updatedResume___________", updatedResume);

      if (updatedResume) {
        return res.status(200).json({
          status: true,
          message: "Personal details updated successfully",
          data: updatedResume,
          error: false,
        });
      } else {
        return res.status(500).json({
          status: true,
          message: "Personal details updated Failed",
          error: false,
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "ResumeID not found",
        error: true,
      });
    }

  } catch (err) {
    console.error("Resume Personal Details Unexpected Error:__________", err);
    return res.status(500).json({
      status: false,
      message: err?.message || "Internal Server Error",
      error: true,
    });
  }
};

//Resume Summary 
exports.resumeAddSummary = async (req, res) => {
  const { resumeId, summary } = req.body;
  try {
    const validationError = validationErrorMessage(req, res);
    if (validationError) {
      return validationError;
    }

    const findResumeId = await userResumeModel.findOne({ resumeId: resumeId })
    console.log("findResumeId___________", findResumeId);

    if (findResumeId) {
      const updatedResume = await userResumeModel.findOneAndUpdate(
        { resumeId: resumeId },
        { $set: { summary } },
        { new: true, upsert: true, runValidators: true }
      )
      console.log("updatedResume_______", updatedResume);

      if (updatedResume) {
        return res.status(200).json({
          status: true,
          message: "Summary details updated successfully",
          data: updatedResume,
          error: false,
        });
      } else {
        return res.status(500).json({
          status: true,
          message: "Summary details updated Failed",
          error: false,
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "ResumeID not found",
        error: true,
      });
    }

  } catch (err) {
    console.error("Resume Summary Details Unexpected Error:__________", err);
    return res.status(500).json({
      status: false,
      message: err?.message || "Internal Server Error",
      error: true,
    });
  }
};

//Resume Experience
exports.resumeAddProfessionalExperience = async (req, res) => {

  const { resumeId, experience } = req.body;

  try {
    const validationError = validationErrorMessage(req, res);
    if (validationError) {
      return validationError;
    }
    const findResumeId = await userResumeModel.findOne({ resumeId: resumeId })
    console.log("findResumeId___________", findResumeId);

    if (findResumeId) {
      console.log("experience", experience);

      const updatedResume = await userResumeModel.findOneAndUpdate(
        { resumeId: resumeId },
        { $set: { experience: experience } },
        { new: true, runValidators: true }
      )
      console.log("updatedResume__________", updatedResume);

      if (updatedResume) {
        return res.status(200).json({
          status: true,
          message: "Experience details updated successfully",
          data: updatedResume,
          error: false,
        });
      } else {
        return res.status(500).json({
          status: true,
          message: "Experience details updated Failed",
          error: false,
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "ResumeID not found",
        error: true,
      });
    }
  } catch (err) {
    console.error("Resume Experience Details Unexpected Error:__________", err);
    return res.status(500).json({
      status: false,
      message: err?.message || "Internal Server Error",
      error: true,
    });
  }
};

//Resume Project
exports.resumeAddProjects = async (req, res) => {
  const { resumeId, projects } = req.body;

  try {
    const validationError = validationErrorMessage(req, res);
    if (validationError) {
      return validationError;
    }
    const findResumeId = await userResumeModel.findOne({ resumeId: resumeId })
    console.log("findResumeId___________", findResumeId);

    if (findResumeId) {

      const updatedResume = await userResumeModel.findOneAndUpdate(
        { resumeId: resumeId },
        { $set: { projects: projects } },
        { new: true, runValidators: true }
      )
      console.log("updatedResume__________", updatedResume);

      if (updatedResume) {
        return res.status(200).json({
          status: true,
          message: "Project details updated successfully",
          data: updatedResume,
          error: false,
        });
      } else {
        return res.status(500).json({
          status: true,
          message: "Project details updated Failed",
          error: false,
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "ResumeID not found",
        error: true,
      });
    }

  } catch (err) {
    console.error("Resume Project Details Unexpected Error:__________", err);
    return res.status(500).json({
      status: false,
      message: err?.message || "Internal Server Error",
      error: true,
    });
  }
};

//Resume Education 
exports.resumeAddEducationDetails = async (req, res) => {

  const { resumeId, education } = req.body;

  try {
    const validationError = validationErrorMessage(req, res);
    if (validationError) {
      return validationError;
    }
    const findResumeId = await userResumeModel.findOne({ resumeId: resumeId })
    console.log("findResumeId___________", findResumeId);

    if (findResumeId) {

      const updatedResume = await userResumeModel.findOneAndUpdate(
        { resumeId: resumeId },
        { $set: { education: education } },
        { new: true, runValidators: true }
      )
      console.log("updatedResume__________", updatedResume);

      if (updatedResume) {
        return res.status(200).json({
          status: true,
          message: "Education details updated successfully",
          data: updatedResume,
          error: false,
        });
      } else {
        return res.status(500).json({
          status: true,
          message: "Education details updated Failed",
          error: false,
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "ResumeID not found",
        error: true,
      });
    }
  } catch (err) {
    console.error("Resume Education Details Unexpected Error:__________", err);
    return res.status(500).json({
      status: false,
      message: err?.message || "Internal Server Error",
      error: true,
    });
  }
};

//Resume Course
exports.resumeAddCourseDetails = async (req, res) => {

  const { resumeId, courses } = req.body;

  try {
    const validationError = validationErrorMessage(req, res);
    if (validationError) {
      return validationError;
    }
    const findResumeId = await userResumeModel.findOne({ resumeId: resumeId })
    console.log("findResumeId___________", findResumeId);

    if (findResumeId) {

      const updatedResume = await userResumeModel.findOneAndUpdate(
        { resumeId: resumeId },
        { $set: { courses: courses } },
        { new: true, runValidators: true }
      )
      console.log("updatedResume__________", updatedResume);

      if (updatedResume) {
        return res.status(200).json({
          status: true,
          message: "Courses details updated successfully",
          data: updatedResume,
          error: false,
        });
      } else {
        return res.status(500).json({
          status: true,
          message: "Courses details updated Failed",
          error: false,
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "ResumeID not found",
        error: true,
      });
    }
  } catch (err) {
    console.error("Resume Course Details Unexpected Error:__________", err);
    return res.status(500).json({
      status: false,
      message: err?.message || "Internal Server Error",
      error: true,
    });
  }
};

//Resume Skills
exports.resumeAddSkills = async (req, res) => {
  const { resumeId, skills } = req.body;
  try {
    const validationError = validationErrorMessage(req, res);
    if (validationError) {
      return validationError;
    }
    const findResumeId = await userResumeModel.findOne({ resumeId: resumeId })
    console.log("findResumeId___________", findResumeId);

    if (findResumeId) {

      const updatedResume = await userResumeModel.findOneAndUpdate(
        { resumeId: resumeId },
        { $set: { skills: skills } },
        { new: true, runValidators: true }
      )
      console.log("updatedResume__________", updatedResume);

      if (updatedResume) {
        return res.status(200).json({
          status: true,
          message: "Skills details updated successfully",
          data: updatedResume,
          error: false,
        });
      } else {
        return res.status(500).json({
          status: true,
          message: "Skills details updated Failed",
          error: false,
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "ResumeID not found",
        error: true,
      });
    }
  } catch (err) {
    console.error("Resume Skills Details Unexpected Error:__________", err);
    return res.status(500).json({
      status: false,
      message: err?.message || "Internal Server Error",
      error: true,
    });
  }
};

//Resume Softskills
exports.resumeAddSoftSkills = async (req, res) => {
  const { resumeId, softSkills } = req.body;
  try {
    const validationError = validationErrorMessage(req, res);
    if (validationError) {
      return validationError;
    }
    const findResumeId = await userResumeModel.findOne({ resumeId: resumeId })
    console.log("findResumeId___________", findResumeId);

    if (findResumeId) {

      const updatedResume = await userResumeModel.findOneAndUpdate(
        { resumeId: resumeId },
        { $set: { softSkills: softSkills } },
        { new: true, runValidators: true }
      )
      console.log("updatedResume__________", updatedResume);

      if (updatedResume) {
        return res.status(200).json({
          status: true,
          message: "Softskills details updated successfully",
          data: updatedResume,
          error: false,
        });
      } else {
        return res.status(500).json({
          status: true,
          message: "Softskills details updated Failed",
          error: false,
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "ResumeID not found",
        error: true,
      });
    }
  } catch (err) {
    console.error("Resume Softskills Details Unexpected Error:__________", err);
    return res.status(500).json({
      status: false,
      message: err?.message || "Internal Server Error",
      error: true,
    });
  }
};

//Resume Hobbies 
exports.resumeAddHobbies = async (req, res) => {
  const { resumeId, hobbies } = req.body;
  try {
    const validationError = validationErrorMessage(req, res);
    if (validationError) {
      return validationError;
    }
    const findResumeId = await userResumeModel.findOne({ resumeId: resumeId })
    console.log("findResumeId___________", findResumeId);

    if (findResumeId) {

      const updatedResume = await userResumeModel.findOneAndUpdate(
        { resumeId: resumeId },
        { $set: { hobbies: hobbies } },
        { new: true, runValidators: true }
      )
      console.log("updatedResume__________", updatedResume);

      if (updatedResume) {
        return res.status(200).json({
          status: true,
          message: "Hobbies details updated successfully",
          data: updatedResume,
          error: false,
        });
      } else {
        return res.status(500).json({
          status: true,
          message: "Hobbies details updated Failed",
          error: false,
        });
      }
    } else {
      return res.status(404).json({
        status: false,
        message: "ResumeID not found",
        error: true,
      });
    }
  } catch (err) {
    console.error("Resume Hobbies Details Unexpected Error:__________", err);
    return res.status(500).json({
      status: false,
      message: err?.message || "Internal Server Error",
      error: true,
    });
  }
};

//Resume Get all document
exports.resumeGetAll = async (req, res) => {

  const { page = 1, limit = 10, userEmail } = req.query;

  try {
    if (!userEmail || !userEmail.trim()) {
      return res.status(400).json({
        status: false,
        message: "The 'userEmail' field is required and cannot be empty.",     // Validate userEmail
        error: true,
      });
    }

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const query = { userEmail: userEmail.toLowerCase().trim() };

    Promise.all([
      userResumeModel.find(query).sort({ createdAt: -1 }).skip((pageNumber - 1) * limitNumber).limit(limitNumber),
      userResumeModel.countDocuments(query),
    ])
      .then(([resumes, totalResumes]) => {
        return res.status(200).json({
          status: true,
          message: "Resumes fetched successfully",
          data: resumes,
          pagination: {
            currentPage: pageNumber,
            totalPages: Math.ceil(totalResumes / limitNumber),
            totalResumes,
          },
          error: false,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          message: "Failed to fetch resumes get all",
          error: true
        });
      });

  } catch (err) {
    console.error("Resume GetAll documents Error:", err?.message);
    return res.status(500).json({
      status: false,
      message: err?.message || "Internal Server Error",
      error: true
    });
  }
};

// Single ID get

exports.resumeSingleIdGetDetails = async (req, res) => {
  const { resumeId } = req.query;
  try {
    const findResumeData = await userResumeModel.findOne({ resumeId: resumeId })
    console.log("findResumeData_________________", findResumeData);
    if (!findResumeData) {
      return res.status(404).json({
        status: false,
        message: "ResumeID not found",
        error: true,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Resumes fetched successfully",
        data: findResumeData,
        error: false,
      });
    }
  } catch (err) {
    console.error("Resume SingleId Get documents Error:", err?.message);
    return res.status(500).json({
      status: false,
      message: err?.message || "Internal Server Error",
      error: true
    });
  }
}

// Resume Delete document
exports.resumeDelete = async (req, res) => {
  try {
    const { resumeId } = req.params;

    // Validate resumeId
    if (!resumeId || !resumeId.trim()) {
      return res.status(400).json({
        status: false,
        message: "The 'resumeId' field is required and cannot be empty.",
        error: true,
      });
    }

    // Find and delete the resume
    const deletedResume = await userResumeModel.findOneAndDelete({ resumeId });
    console.log("deletedResume", deletedResume);

    if (!deletedResume || deletedResume == null) {
      return res.status(404).json({
        status: false,
        message: "ResumeID not found",
        error: true,
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Resume deleted successfully",
        error: false,
      });
    }

  } catch (err) {
    console.error("Resume Delete Error:________", err?.message);
    return res.status(500).json({
      status: false,
      message: err?.message || "Internal Server Error",
      error: true
    });
  }
};



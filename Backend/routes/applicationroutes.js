
const express = require('express')
const prisma = require('../db/prisma/prisma')
const authmiddleware = require('../middleware/authmiddleware')

const router = express.Router()


router.post('/', authmiddleware, async (req, res) => {
  const { proposal, bidamount, status, companyid, tenderid, estimatedCompletion } = req.body;

  try {

    const tender = await prisma.tender.findUnique({
      where: { id: Number(tenderid) }
    });

    if (!tender) {
      return res.status(404).json({
        message: "Tender not found"
      });
    }


    const company = await prisma.company.findUnique({
      where: { id: Number(companyid) }
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }


    const existingApplication = await prisma.application.findFirst({
      where: {
        tenderid: Number(tenderid),
        companyid: Number(companyid),
      },
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "This company has already submitted an application for this tender"
      });
    }


    const response = await prisma.application.create({
      data: {
        proposal,
        bidamount: Number(bidamount),
        status,
        companyid: Number(companyid),
        tenderid: Number(tenderid),
        estimatedCompletion
      }
    });

    if (!response) {
      return res.status(500).json({
        message: "Error creating application"
      });
    }

return res.status(200).json({
  message : "Application created"
})

  } catch (e) {
    console.error("Error creating application:", e);
    return res.status(500).json({
      message: "Internal server error",
      error: e.message
    });
  }
});


router.get('/', async (req, res) => {

  try {

    const fetchapplications = await prisma.application.findMany();

    if (!fetchapplications) {
      return res.status(404).json({
        message: "Error fetching  applications",
        error: e.message
      }
      )
    }


    return res.status(200).json({
      message: "applications fetched",
      fetchapplications
    }
    )

  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e.message
    }
    )
  }
})




router.get('/:tenderid', async (req, res) => {
  const tenderId = Number(req.params.tenderid);

  try {

    const tender = await prisma.tender.findUnique({
      where: { id: tenderId }
    });

    if (!tender) {
      return res.status(404).json({
        message: "Tender not found"
      });
    }

    const applications = await prisma.application.findMany({
      where: { tenderid: tenderId }
    });

    return res.status(200).json({
      applications: applications
    });

  } catch (e) {
    console.error("Error fetching applications for tender:", e);
    return res.status(500).json({
      message: "Internal server error",
      error: e.message
    });
  }
});



router.put('/:applicationid', async (req, res) => {
  const { status, companyid, tenderid } = req.body;
  const {applicationid} = req.params
  try {
    const tender = await prisma.tender.findUnique({
      where: { id: Number(tenderid) }
    });

    if (!tender) {
      return res.status(404).json({
        message: "Tender not found"
      });
    }

    const company = await prisma.company.findUnique({
      where: { id: Number(companyid) }
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    const application = await prisma.application.findUnique({
      where: { id: Number(applicationid) }
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    const updateApplication = await prisma.application.update({
      where: { id: Number(applicationid) },
      data: { status: status }
    });

    if (!updateApplication) {
      return res.status(500).json({
        message: "Error updating application status"
      });
    }

    return res.status(200).json({
      message: `Application status updated to ${status} successfully`
    });

  } catch (e) {
    console.error("Error updating application status:", e);
    return res.status(500).json({
      message: "Internal server error",
      error: e.message
    });
  }
});





router.delete('/:id', async (req, res) => {
  const applicationId = Number(req.params.id);

  try {
    // Check if application exists
    const existingApplication = await prisma.application.findUnique({
      where: { id: applicationId }
    });

    if (!existingApplication) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    // Delete application
    await prisma.application.delete({
      where: { id: applicationId }
    });

    return res.status(200).json({
      message: "Application deleted successfully"
    });

  } catch (e) {
    console.error("Error deleting application:", e);
    return res.status(500).json({
      message: "Internal server error",
      error: e.message
    });
  }
});




module.exports = router
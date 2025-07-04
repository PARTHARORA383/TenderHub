const express = require('express')
const prisma = require('../db/prisma/prisma')
const authmiddleware = require('../middleware/authmiddleware')

const router = express.Router()

router.post('/', authmiddleware, async (req, res) => {
  const { title, description, deadline, budget, company_id, type, locked } = req.body;

  if (!title || !deadline || !budget || !company_id) {
    return res.status(400).json({
      message: "Arguments missing",
    });
  }

  try {

    const company = await prisma.company.findFirst({
      where: { id: Number(company_id) },
    });


    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    const newTender = await prisma.tender.create({
      data: {
        title,
        deadline: new Date(deadline),
        description,
        type,
        locked,
        budget: Number(budget),
        company_id :Number(company_id)
      },
    });

    const updatecompany = await prisma.company.update({
      where: { id: Number(company_id) },
      data: {
        tenders: {
          create: {
            title,
            deadline: new Date(deadline),
            description,
            type,
            locked,
            budget: Number(budget)
          }
        }
      }
    })

    if(!updatecompany){
      return res.status(404).json({
        message : "Eroor updating the company"
      })
    }

    return res.status(200).json({
      message: "Tender created successfully",
      newTender,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
});


router.get('/', async (req, res) => {

  try {
    const fetchTender = await prisma.tender.findMany({
        include: {
    application : true
  }
    })

    if (!fetchTender) {
      return res.status(404).json({
        message: "Error fetching tenders"
      })
    }

    return res.status(200).json({
      message: "Tenders fetched successfully",
      fetchTender
    })


  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e.message
    })
  }

})


router.get('/:id', async (req, res) => {

  const { id } = req.params

  try {
    const fetchTender = await prisma.tender.findFirst({
      where: { id: Number(id) } ,
        include: {
    application : true
  }
    })

    if (!fetchTender) {
      return res.status(404).json({
        message: "Error fetching a tender"
      })
    }

    return res.status(200).json({
      message: "Tender fetched successfully",
      fetchTender
    })


  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e.message
    })
  }

})


module.exports = router


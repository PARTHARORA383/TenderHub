
const express = require('express')
const prisma = require('../db/prisma/prisma')
const authmiddleware = require('../middleware/authmiddleware')

const router = express.Router()

router.post('/', authmiddleware, async (req, res) => {

  const { proposal, bidamount, status, companyid, tenderid, estimatedCompletion } = req.body

  try {

    const response = await prisma.application.create({
      data: {
        proposal,
        bidamount: Number(bidamount),
        status: status,
        companyid: Number(companyid),
        tenderid: Number(tenderid),
        estimatedCompletion
      }
    })

    if (!response) {
      return res.status(404).json({
        message: "Error creating an application",
        error: e.message
      }
      )
    }

    return res.status(200).json({
      message: "application created",
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


module.exports = router
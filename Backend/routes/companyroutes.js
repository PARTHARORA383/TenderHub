

const express = require('express');
const authmiddleware = require('../middleware/authmiddleware');
const prisma = require('../db/prisma/prisma');
const router = express.Router();

router.post('/', authmiddleware, async (req, res) => {
  const { name, industry, description, Logo, Services } = req.body;

  try {
    const userId = req.user.userId;
    console.log(userId);

    if (!name || !industry) {
      return res.status(400).json({
        message: 'Invalid inputs',
      });
    }

    const createcompany = await prisma.company.create({
      data: {
        name,
        industry,
        description,
        Logo,
        Services,
        ownerid : userId
      },
    });

    if (!createcompany) {
      return res.status(400).json({
        message: "Cannot create the company",
      });
    }

    return res.status(200).json({
      message: "Company created",
      company: createcompany,
    });

  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
});


router.get('/' , async (req , res)=>{


try{
  const companydetails = await prisma.company.findMany({
  include: {
    tenders: true ,
    application : true
  }
  })

  return res.status(200).json({
    message : "company  fetched succesfully",
    companydetails
  })
}catch(e){
  return res.status(500).json({
    message : "Internal server error",
    error : e.message

  })
}
})



router.get('/:id' , async (req , res)=>{

const {id} = req.params

try{
  const companydetails = await prisma.company.findFirst({
    where : {id : Number(id)} ,
      include: {
    tenders: true ,
    application : true
  }
  })

  if(!companydetails){
    return res.status(404).json({
      message : 'company does not exist'
    })
  }

  return res.status(200).json({
    message : "company details fetched succesfully",
    companydetails
  })
}catch(e){
  return res.status(500).json({
    message : "Internal server error",
    error : e.message
  })
}
})





module.exports = router;

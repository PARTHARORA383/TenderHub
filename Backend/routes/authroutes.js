
const express = require('express')
const z = require('zod')
const router = express.Router()
const prisma = require('../db/prisma/prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/signup', async (req, res) => {
  const { email, password } = req.body

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })

  const result = schema.safeParse({
    email: email, password: password
  })

  if (!result.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: result.error.errors
    });
  }
  try {
    const hasdedPassword = await bcrypt.hash(result.data.password, 10)

    const checkifemailexist = await prisma.user.findFirst({
      where: { email: result.data.email }
    })

    if (checkifemailexist) {
      return res.status(409).json({
        message: "Email already exist"
      })
    }

    const newUser = await prisma.user.create({
      data: { email: result.data.email, password: hasdedPassword }
    })

    if (!newUser) {
      return res.status(400).json({
        message: "Cannot create a user",
        error: e.message
      })
    }
    const token = jwt.sign({userId : newUser.id , email : newUser.email},
       process.env.JWT_SECRET , {
      expiresIn : '1d'
    })  

    return res.status(200).json({
      message: "user created",
      userId: newUser.id ,
      token : `Bearer ${token}`
    })
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e.message
    })
  }
})



router.post('/login', async (req, res) => {

  const { email, password } = req.body

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })

  const result = schema.safeParse({
    email, password
  })

  if (!result.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: result.error.errors
    });
  }




  try {
    const user = await prisma.user.findFirst({
      where: { email: result.data.email }
    })

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    const matchpassword = await bcrypt.compare(result.data.password, user.password)

    if (!matchpassword) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {userId : user.id , email : user.email},
      process.env.JWT_SECRET , {
        expiresIn : '1d'
      }
    )

    return res.status(200).json({
      message: "Login successful",
      userId: user.id ,
      token : `Bearer ${token}`
    });


  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e.message
    })
  }
})




module.exports = router
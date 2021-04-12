const { json } = require('express')
const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  let { name, budget } = req.body
  if (!name || !budget) {
    res.status(400).json({
      message: "Name and Budget required"
    })
  } else if(typeof name !== 'string') {
    res.status(400).json({
      message: "name of account must be a string"
    })
  } else if(name.length > 3 || name.length < 100){
    res.status(400).json({
      message: "name of account must be between 3 and 100"
    })
  } else if (typeof budget !== 'number') {
    res.status(400).json({
      message: "budget of account must be a number"
    })
  }else if (budget < 0 || budget > 1000000) {
    res.status(400).json({
      message: "budget of account is too large or too small"
    })
    }
  else {
    req.body.name = name.trim()
    next()
  }
}

// exports.checkAccountNameUnique = (req, res, next) => {
//   // DO YOUR MAGIC
// }

exports.checkAccountId = async (req, res, next) => {
  try {
    const checkAccount = await Accounts.getById(req.params.id)
    if (checkAccount) {
      req.account = checkAccount
      next()
    } else {
      res.status(404).json({
        message: "account not found"
      })
    }
  } catch(err) {
    next(err)
  }
}

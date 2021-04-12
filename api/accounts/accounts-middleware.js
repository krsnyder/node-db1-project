const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if (name && budget) {
    next()
  } else {
    res.status(400).json({
      message: "Name and Budget required"
    })
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const checkId = await Accounts.getById(req.params.id)
    if (checkId) {
      req.account = account
      next()
    } else {
      res.status(404).json({
        message: "Account not found"
      })
    }
  } catch(err) {
    next(err)
  }
}

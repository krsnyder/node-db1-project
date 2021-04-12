const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const checkId = await Accounts.getById(req.params.id)
    if (checkId) {
      req.post = post
    } else {
      res.status(404).json({
        message: "Account not found"
      })
    }
  } catch(err) {
    next(err)
  }
}

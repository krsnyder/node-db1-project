const router = require('express').Router()
const Accounts = require("./accounts-model")
const { checkAccountPayload, checkAccountId } = require("./accounts-middleware")

router.get('/', async (req, res, next) => {
  try {
    const data = await Accounts.getAll()
    res.status(200).json(data)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, (req, res) => {
  res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create(req.body)
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id',  checkAccountId, checkAccountPayload, async (req, res, next) => {
  try {
    const updatedAccount = await Accounts.create(req.body)
    res.status(200).json(updatedAccount)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  //checkAccountId assigns data to req.account, this is available to us
  try {
    const deletedAccount = await Accounts.getById(req.params.id)
    res.status(200).json(deletedAccount)
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router;

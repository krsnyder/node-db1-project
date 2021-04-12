const db = require("../../data/db-config")

const getAll = () => {
  return db("posts")
}

const getById = id => {
  return db("posts").where("id", id).first()
  //return db("posts").where({id}).first()
}

const create = async ({name, budget}) => {
  const [id] = await db("accounts").insert({name, budget})
  return getById(id)
}

const updateById = async (id, {name, budget}) => {
  await db("posts").where("id", id).update({ name, budget })
  return getById(id)
}

const deleteById = async id => {
  const deletedPost = await getById(id)
  await db("posts").where("id", id).delete()
  return(deletedPost)
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

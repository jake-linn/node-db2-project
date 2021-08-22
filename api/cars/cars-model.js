const db = require("../../data/db-config");

const getAll = () => {
  return db("cars")
}

const getById = id => {
  return db("cars").where({id}).first()
}

const getByVin = vin => {
  return db("cars").where({ vin }).first()
}


const create = async body => {
  const [id]  = await db("cars").insert(body)
  return getById(id)
}


module.exports = {
  getAll,
  getById,
  getByVin,
  create
}
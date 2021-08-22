const Car = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  const id = req.params.id
  try{
    const carId = await Car.getById(id)
        if(!carId){
          res.status(404).json({
            message: `car with id ${id} is not found`
          })
        } else {
          req.car = carId
          next()
        }
  }catch(err){
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  if(!vin){
    res.status(400).json({
      message: "vin is missing"
    })
  }else if(!make){
    res.status(400).json({
      message: "make is missing"
    })
  }else if(!model){
    res.status(400).json({
      message: "model is missing"
    })
  }else if(!mileage){
    res.status(400).json({
      message: "mileage is missing"
    })
  }else{
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body
  const isValidVin = vinValidator.validate(vin)
  if(!isValidVin){
    res.status(400).json({
      message: `vin ${vin} is invalid`
    })
  } else {
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  const { vin } = req.body
  Car.getByVin(vin)
    .then(vinNum => {
      if(vinNum){
        res.status(400).json({
          message: `vin ${vin} already exists`
        })
      }else{
        next()
      }
    })
    .catch(next)
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
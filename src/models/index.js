class BaseModel {
  constructor(msg, data = null) {
    this.data = data
    this.msg = msg
  }
}

class SuccessModel extends BaseModel {
  constructor(msg, data) {
    super(msg, data)
    this.code = 0
  }
}

class FailModel extends BaseModel {
  constructor(msg, data) {
    super(msg, data)
    this.code = -1
  }
}


module.exports = {
  SuccessModel, 
  FailModel
}
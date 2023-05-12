class BaseModel {
  constructor(data, msg) {
    this.data = data
    this.msg = msg
    if (typeof data === 'string') {
      this.data = {}
      this.msg = data
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, msg) {
    super(data, msg)
    this.code = 0
  }
}

class FailModel extends BaseModel {
  constructor(data, msg) {
    super(data, msg)
    this.code = -1
  }
}


module.exports = {
  SuccessModel, 
  FailModel
}
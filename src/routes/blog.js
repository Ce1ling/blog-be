const express = require('express')
const { SuccessModel, FailModel } = require('../models')
const { 
  getBlogList, 
  getBlogDetails, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} = require('../controllers/blog')
const { isTargetType } = require('../utils/type')

const router = express.Router()

// 获取博客列表
router.get('/api/blog', (_, response) => {
  getBlogList().then(data => {
    response.send(new SuccessModel('获取成功', data))
  }).catch(err => {
    response.send(new FailModel('获取失败'))
    console.error(err)
  })
})

// 获取博客详情
router.get('/api/blog/details', (request, response) => {
  const { id } = request.query

  if (!id) {
    response.send(new FailModel('错误, 请传递 id'))
    return
  }

  getBlogDetails(id).then(data => {
    if (data.length) {
      response.send(new SuccessModel('获取成功', data))
      return
    }
    response.send(new FailModel('未找到, 请检查 id'))
  }).catch(err => {
    response.send(new FailModel('获取失败', err.sqlMessage))
    console.error(err)
  })
})

// 创建博客
router.post('/api/blog', (request, response) => {
  const { title, content } = request.body

  if (!title || !content) {
    response.send(new FailModel('创建失败, 请检查参数是否完整'))
    return
  }

  if (!isTargetType([title, content], 'string')) {
    response.send(new FailModel('创建失败, title 与 content 只能为 string 类型'))
    return
  }

  createBlog(title, content).then(data => {
    response.send(new SuccessModel('创建成功', data.insertId))
  }).catch(err => {
    response.send(new FailModel('创建失败', err.sqlMessage))
    console.error(err)
  })
})

// 更新博客
router.put('/api/blog', (request, response) => {
  const { 
    query: { id }, 
    body: { title, content },
    body,
  } = request

  if (!id || !title || !content) {
    response.send(new FailModel('更新失败, 请检查参数是否完整'))
    return
  }

  if (!isTargetType([id, title, content], 'string')) {
    response.send(new FailModel('更新失败, id, title, content 只能为 string 类型'))
    return
  }

  updateBlog(id, body)
    .then(() => getBlogDetails(id))
    .then(data => {
      if (data.length) {
        response.send(new SuccessModel('更新成功', data))
        return
      }
      response.send(new FailModel('没有数据被更新, 请检查 id'))
    })
    .catch(err => {
      response.send(new FailModel('更新失败', err.sqlMessage))
      console.error(err)
    })
})

// 删除博客
router.delete('/api/blog', (request, response) => {
  const { id } = request.query

  if (!id) {
    response.send(new FailModel('删除失败, 请检查参数是否完整'))
    return
  }

  deleteBlog(id).then(data => {
    if (data.affectedRows) {
      response.send(new SuccessModel('删除成功'))
      return
    }
    response.send(new FailModel('没有数据被删除, 请检查 id 是否正确'))
  }).catch(err => {
    response.send(new FailModel('删除失败', err.sqlMessage))
    console.error(err)
  })
})

module.exports = router
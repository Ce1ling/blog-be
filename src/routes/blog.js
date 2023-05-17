const express = require('express')
const { SuccessModel, FailModel } = require('../models')
const { getBlogList, getBlogDetails, createBlog, updateBlog, deleteBlog } = require('../controllers/blog')

const router = express.Router()

// 获取博客列表
router.get('/api/blog', (_, response) => {
  getBlogList().then(r => {
    response.send(new SuccessModel(r, '获取成功'))
  }).catch(err => {
    response.send(new FailModel(err, '获取失败'))
  })
})

// 获取博客详情
router.get('/api/blog/details', (request, response) => {
  getBlogDetails(request.query.id).then(r => {
    response.send(new SuccessModel(r, '获取成功'))
  }).catch(err => {
    response.send(new FailModel(err, '获取失败'))
  })
})

// 创建博客
router.post('/api/blog', (request, response) => {
  const { title, content } = request.body
  createBlog(title, content).then(r => {
    response.send(new SuccessModel(r, '创建成功'))
  }).catch(err => {
    response.send(new FailModel(err, '创建失败'))
  })
})

// 更新博客
router.put('/api/blog', (request, response) => {
  updateBlog(request.query.id, request.body).then(r => {
    response.send(new SuccessModel(r, '更新成功'))
  }).catch(err => {
    response.send(new FailModel(err, '更新失败'))
  })
})

// 删除博客
router.delete('/api/blog', (request, response) => {
  deleteBlog(request.query.id).then(r => {
    response.send(new SuccessModel(r, '删除成功'))
  }).catch(err => {
    response.send(new FailModel(err, '删除失败'))
  })
})

module.exports = router
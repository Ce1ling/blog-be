const express = require('express')
const { SuccessModel, FailModel } = require('../models')
const { getBlogList, getBlogDetails, createBlog, updateBlog, deleteBlog } = require('../controllers/blog')

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
  getBlogDetails(request.query.id).then(data => {
    response.send(new SuccessModel('获取成功', data[0]))
  }).catch(err => {
    response.send(new FailModel('获取失败'))
    console.error(err)
  })
})

// 创建博客
router.post('/api/blog', (request, response) => {
  const { title, content } = request.body
  createBlog(title, content).then(r => {
    response.send(new SuccessModel('创建成功', r))
  }).catch(err => {
    response.send(new FailModel('创建失败'))
    console.error(err)
  })
})

// 更新博客
router.put('/api/blog', (request, response) => {
  updateBlog(request.query.id, request.body).then(r => {
    response.send(new SuccessModel('更新成功', r))
  }).catch(err => {
    response.send(new FailModel('更新失败'))
    console.error(err)
  })
})

// 删除博客
router.delete('/api/blog', (request, response) => {
  deleteBlog(request.query.id).then(r => {
    response.send(new SuccessModel('删除成功', r))
  }).catch(err => {
    response.send(new FailModel('删除失败'))
    console.error(err)
  })
})

module.exports = router
const express = require('express')
const { SuccessModel } = require('../models')
const { getBlogList, getBlogDetails, createBlog, updateBlog, deleteBlog } = require('../controllers/blog')
const { runSQL } = require('../database/mysql')

const router = express.Router()

// 获取博客列表
router.get('/api/blog', (request, response) => {
  const { author, keyword } = request.query
  const data = getBlogList(author, keyword)
  runSQL(`SELECT * FROM blog_list`).then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  })

  const msg = '成功'
  const res = new SuccessModel(data, msg)
  response.send(res)
})

// 获取博客详情
router.get('/api/blog/details', (request, response) => {
  const data = getBlogDetails(request.query.id)
  const msg = '成功'
  const res = new SuccessModel(data, msg)
  response.send(res)
})

// 创建博客
router.post('/api/blog', (request, response) => {
  const { title, content } = request.body
  const data = createBlog(title, content)
  const res = new SuccessModel(data)
  response.send(res)
})

// 更新博客
router.put('/api/blog', (request, response) => {
  const data = updateBlog(request.query.id, request.body)
  const res = new SuccessModel(data)
  response.send(res)
})

// 删除博客
router.delete('/api/blog', (request, response) => {
  const data = deleteBlog(request.body.id)
  response.send(new SuccessModel(data))
})

module.exports = router
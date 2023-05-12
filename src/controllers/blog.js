// 模拟数据库
let blogList = [
  {
    id: '1',
    title: 'title 1',
    content: 'content 1',
    author: 'L1en',
    create_at: 1683882014854,
    update_at: 1683882014954,
  },
  {
    id: '2',
    title: 'title 2',
    content: 'content 2',
    author: 'L1en',
    create_at: 1683892014854,
    update_at: 1683892014954,
  }
]

/**
 * 获取 blog 数据
 */
const getBlogList = (author, keyword) => {
  return blogList
}

/**
 * 获取 blog 详情
 */
const getBlogDetails = (id) => {
  return blogList.find(item => item.id === id)
}

/**
 * 创建 blog
 */
const createBlog = (title, content) => {
  return blogList.push({ 
    id: Math.random().toString().slice(2, 6),
    title,
    content,
    author: 'L1en',
    create_at: Date.now(),
    update_at: Date.now(),
  })
}

/**
 * 更新 blog
 */
const updateBlog = (id, data) => {
  blogList = blogList.map(item => {
    if (item.id === id) {
      item = { ...item, ...data }
    }
    return item
  })
  return blogList.find(item => item.id === data.id)
}

/**
 * 删除 blog
 */
const deleteBlog = (id) => {
  blogList = blogList.filter(item => item.id !== id)
  return blogList
}

module.exports = {
  getBlogList,
  getBlogDetails,
  createBlog,
  updateBlog,
  deleteBlog
}
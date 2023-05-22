const { db } = require('../database/mysql')
const { escape }  = require('mysql')


/**
 * 获取 blog 总数
 * @param {*} key 待查找的字段
 */
const getBlogTotal = (key = '*') => {
  return db.run(`SELECT COUNT(${escape(key)}) FROM blog_list;`)
}

/**
 * 获取 blog 数据
 */
const getBlogList = (page, per_page) => {
  return db.run(`
    SELECT * FROM blog_list 
    ORDER BY create_at DESC 
    LIMIT ${escape(page)}, ${escape(per_page)};
  `)
}

/**
 * 获取 blog 详情
 */
const getBlogDetails = (id) => {
  return db.run(`SELECT * FROM blog_list WHERE id=${escape(id)};`)
}

/**
 * 创建 `blog`.
 * 暂未接入用户系统, 所以 `author` 是固定的
 */
const createBlog = (title, content) => {
  const sql = `
    INSERT INTO blog_list (title, content, author, create_at, update_at) 
    VALUES (${escape(title)}, ${escape(content)}, 'L1en', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());
  `
  return db.run(sql)
}

/**
 * 更新 blog
 */
const updateBlog = (id, { title, content }) => {
  const sql = `
    UPDATE blog_list 
    SET title=${escape(title)}, content=${escape(content)}, update_at=UNIX_TIMESTAMP()
    WHERE id=${escape(id)};
  `
  return db.run(sql)
}

/**
 * 删除 blog
 */
const deleteBlog = (id) => {
  return db.run(`DELETE FROM blog_list WHERE id=${escape(id)};`)
}

module.exports = {
  getBlogTotal,
  getBlogList,
  getBlogDetails,
  createBlog,
  updateBlog,
  deleteBlog
}
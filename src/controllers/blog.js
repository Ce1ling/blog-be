const { runSQL } = require('../database/mysql')

/**
 * 获取 blog 数据
 */
const getBlogList = (page, per_page) => {
  return runSQL(`
    SELECT * FROM blog_list 
    ORDER BY create_at DESC 
    LIMIT ${page}, ${per_page};
  `)
}

/**
 * 获取 blog 详情
 */
const getBlogDetails = (id) => {
  return runSQL(`SELECT * FROM blog_list WHERE id=${id};`)
}

/**
 * 创建 `blog`.
 * 暂未接入用户系统, 所以 `author` 是固定的
 */
const createBlog = (title, content) => {
  const sql = `
    INSERT INTO blog_list (title, content, author, create_at, update_at) 
    VALUES ('${title}', '${content}', 'L1en', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());
  `
  return runSQL(sql)
}

/**
 * 更新 blog
 */
const updateBlog = (id, { title, content }) => {
  const sql = `
    UPDATE blog_list 
    SET title='${title}', content='${content}', update_at=UNIX_TIMESTAMP()
    WHERE id=${id};
  `
  return runSQL(sql)
}

/**
 * 删除 blog
 */
const deleteBlog = (id) => {
  return runSQL(`DELETE FROM blog_list WHERE id=${id};`)
}

module.exports = {
  getBlogList,
  getBlogDetails,
  createBlog,
  updateBlog,
  deleteBlog
}
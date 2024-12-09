import React from 'react'

export default function App() {
  console.log('NODE_ENV', process.env.NODE_ENV)
  console.log('BASE_ENV', process.env.BASE_ENV)
  return (
    <>
      <h2>我的APP</h2>
      <div>构建模式：{process.env.NODE_ENV}</div>
      <div>业务环境：{process.env.BASE_ENV}</div>
    </>
  )
}

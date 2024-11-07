import { defineConfig } from 'vitepress'
import { sidebar } from './config/sidebar'
export default defineConfig({
  title: "Icarus 技术文档",
  description: "Icarus Technical Blog",
  author: "Zhao Shijun",
  base: '/icarus',
  markdown: {
    lineNumbers: true,
    config: md => {
      md.set({ html: true })
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css' }],
    ['link', { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css" }]
  ],
  lastUpdated: '上次更新',
  themeConfig: {
    logo: '../logo.png',
    siteTitle: '浩瀚宇宙，未知征程',
    sidebar: sidebar,
    nav: [
      {
        text: "Web前端开发",
        items: [
          {
            text: '前端面试指南',
            link: "/guide/知识体系与面试世界观"
          },
          {
            text: '前端应用笔记',
            link: "/notes/WebSocket心跳重连机制"
          },
          {
            text: '基于Vue3.x的前端后台管理框架',
            link: "/vue3/Part1.初始化"
          },
          {
            text: 'Three.js的3D世界',
            link: "/three/01.Three.js基础概念"
          },
          {
            text: 'LeetCode 算法题解',
            link: "/LeetCode/算法笔记"
          }
        ]
      },
      {
        text: "前端之外",
        items: [
          { text: "《区块链技术与应用》公开课", link: "/BlockChain/比特币的密码学原理" },
          { text: "Flutter", link: "/flutter/dart" },
          { text: "计算机网络", link: "/network/DNS 域名解析系统：CNAME 记录的作用是？" },
        ]
      },
      { text: "一些值得记录的观点", link: "/viewpoint/大厂的员工还是应该有危机感" },
    ],
    footer: {
      copyright: 'Copyright © 2023-present Icarus'
    },

  }
})

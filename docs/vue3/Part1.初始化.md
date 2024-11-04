# 基于 Vue-cli 创建的 Vue3.2 版本前端框架

🔴 正在编写...

```javascript
/* ./src/main.js */

const app = createApp(App)
```

### 一、框架依赖

1. UI 框架依赖

```shell
$ npm install element-plus -S
$ npm install @element-plus/icons -S
```

```javascript
/* ./src/main.js */

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 汉化
import 'element-plus/dist/index.css' // 样式文件

app.use(ElementPlus, {
	locale: zhCn,
})
```

📝 加载 ElementUI 全部的 ICON

```javascript
/* ./src/main.js */

import * as ElIcons from '@element-plus/icons'
for (const name in ElIcons) {
	app.component(name, ElIcons[name])
}
```

```javascript
// 结合el-icon使用
<el-icon>
	<delete />
</el-icon>

// 在el-menu组件中动态使用
<el-icon>
  <component :is="route.meta.icon" />
</el-icon>
```

2. HTTP 请求 框架依赖

```shell
$ npm install axios -S
```

📝 封装 `axios`

> 请跳转至 Part3.封装 axios

3. 前端自适应 依赖，计算 px 转换 rem，版本必须是`5.1.1`

```shell
$ npm install postcss-pxtorem@5.1.1 -S
```

📝 使用 `postcss-pxtorem`

```javascript
/* ./src/main.js */
import './rem.js'

/* ./rem.js */
;(function () {
	const baseSize = 16
	function setRem() {
		const scale = document.documentElement.clientWidth / 1920
		document.documentElement.style.fontSize = baseSize * Math.min(scale, 1.2) + 'px'
	}
	setRem()
	window.addEventListener('resize', () => {
		setRem()
	})
})()

/* ./postcss.config.js */
module.exports = {
	plugins: {
		'postcss-pxtorem': {
			rootValue: 16, // 结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
			propList: ['*'],
			unitPrecision: 3, // 保留rem小数点多少位
			mediaQuery: false, // 媒体查询( @media screen 之类的)中不生效
			minPixelValue: 12, // px小于12的不会被转换
		},
	},
}
```

📝 遇到未安装`sass-loader`等问题，使用`dart-sass`

```shell
$ npm install sass-loader@9.0.0 -D
$ npm install sass -D
```

```JavaScript
/* vue.config.js */
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'), // This line must in sass option
      },
    },
  }
}
```

4. `eslint`校验规则集成到`package.json`

```json
"eslintConfig":{
	"rules": {
		// 不检测已定义的变量是否被使用，作用在JavaScript代码部分
		"no-unused-vars": "off",
		// 不检测已定义的变量是否被使用，作用在vue模板部分
		"vue/no-unused-vars":"off",
		// 不检测是否有未定义的变量
		"no-undef": "off"
	}
}
```

5. `vite`中的环境变量
   `Vite` 在一个特殊的 `import.meta.env` 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量：

-   `import.meta.env.MODE`: `{string}` 应用运行的模式。
-   `import. meta.env.BASE_URL`: `{string}` 部署应用时的基本 URL。他由`base`配置项决定。
-   `import. meta.env.PROD`: `{boolean}` 应用是否运行在生产环境。
-   `import. meta.env.DEV`: `{boolean}` 应用是否运行在开发环境 (永远与 `import.meta.env.PROD`相反)。
-   `import.meta.env.SSR`: `{boolean}` 应用是否运行在 `server` 上。

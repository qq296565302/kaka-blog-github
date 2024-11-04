# Vue3.x 实现常见的三种文件类型在线预览 PDF / Word / Excel

### 一、预览`PDF`文件

```shell
$ npm install vue-pdf-embed vue3-pdfjs --save
```

1. 新建一个文件:`PDFPreview.vue`

```HTML
<template>
  <div class="Component-PDFPreview">
    <vue-pdf-embed
      :source="data.source"
      class="vue-pdf-embed"
      :page="data.pageNum"
    />
  </div>
</template>
```

```JavaScript
import VuePdfEmbed from 'vue-pdf-embed'
import { createLoadingTask } from 'vue3-pdfjs/esm' // 获得总页数
const props = defineProps({
  pdfUrl: {
    type: String,
    default:''
  }
})
/**
 * 数据部分
 */
const data = reactive({
  source:props.pdfUrl, // 预览pdf文件地址，测试地址：http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf
  pageNum: 1, // 当前页面
  scale: 1, // 缩放比例
  numPages: 0 // 总页数
})
onMounted(() => {
  const loadingTask = createLoadingTask(data.source)
  loadingTask.promise.then((pdf) => {
    data.numPages = pdf.numPages
  })
})
```

```css
.Component-PDFPreview {
	height: 100%;
	width: 100%;
	.vue-pdf-embed {
		height: 92%;
		overflow: auto;
		text-align: center;
		width: 100%;
		&::-webkit-scrollbar {
			display: none;
		}
	}
}
```

2. 添加文件的翻页功能，缩放功能，当前页面/总页数展示功能添加完善

```JavaScript
const scale = computed(() => `transform:scale(${data.scale})`)

// 上一页
const lastPage = () => {
    if (data.pageNum > 1) {
        data.pageNum -= 1;
    }
}

// 下一页
const nextPage = () => {
    if (data.pageNum < data.numPages) {
        data.pageNum += 1;
    }
}

// 放大
const pageZoomOut = () => {
    if (data.scale < 2) {
        data.scale += 0.1;
    }
}
// 缩小
const pageZoomIn = () => {
    if (data.scale > 1) {
        data.scale -= 0.1;
    }
}
```

3. 问题：

-   不支持`https`协议地址
-   无法预览本地`PDF`文件

### 二、预览`Word`文件

### 三、预览`Excel`文件

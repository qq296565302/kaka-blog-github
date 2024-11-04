# Vue3 封装 ElementPlus 表单

#### 一. 注册全局组件

```js
// main.js
import ComponentName from './components/ComponentName.vue';
app.component('ComponentName', ComponentName);
```

#### 二. 父组件使用

```js
<ComponentName />
```

#### 三. 子组件使用

1. `template` 代码

```js
<el-form :model="data.form" :inline="true" size="middle" class="Component-TableFilter" :label-width="props.labelWidth">
  <el-row class="row" :gutter="20">
    <el-col :span="6" v-for="item in props.formConfig" :key="item.field" class="col">
      <!-- 输入框 / 密码，默认输入框 -->
      <template v-if="!item.type || item.type === 'password' || item.type === 'input'">
        <el-form-item class="item" :label="item.label" :prop="item.field">
          <el-input v-model="data.formModelValue[item.field]" :type="item.type || 'input'" :placeholder="item.placeholder" @update:modelValue="valueChange($event, item.field)"></el-input>
        </el-form-item>
      </template>
      <!-- 选择器 -->
      <template v-if="item.type === 'select'">
        <el-form-item class="item" :label="item.label" :prop="item.field">
          <el-select v-model="data.formModelValue[item.field]" clearable :placeholder="item.placeholder" @update:modelValue="valueChange($event, item.field)">
            <el-option :label="it.label" :value="it.value" v-for="it in item.option" :key="it.value" />
          </el-select>
        </el-form-item>
      </template>
    </el-col>
  </el-row>
</el-form>
```

2. `template` 代码解析
   `@update:modelValue="valueChange($event, item.field)"` ： 用来更新父组件的数据
3.

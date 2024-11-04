# Flutter 基础

> 无状态组件和状态组件的区别 ❓

### Flutter 基础组件

---

#### 修改资源请求地址

```dart
// android/build.gradle
repositories:{
  maven { url 'https://maven.aliyun.com/repository/google' }
  maven { url 'https://maven.aliyun.com/repository/jcenter' }
  maven { url 'https://maven.aliyun.com/repository/public' }
}
```

#### Fluro 路由

##### 1.安装

```
// pub 地址
https://pub.dev/packages/fluro
// pubspec.yaml
dependencies:
    fluro: ^2.0.4
```

##### 2.声明路由处理器

1. 创建文件夹 `/lib/Routes`
2. 创建文件 `RoutesHandler.dart`

```dart
import 'package:flutter/material.dart';
// 引入 fluro
import 'package:fluro/fluro.dart';
// 引入要创建路由的页面
import '../Pages/index.dart'; //首页
import '../Pages/User/login.dart'; // 登录页
import '../Pages/NotFound/404.dart'; // 404

/*
* 创建首页路由 indexHandler
* @param  context 上下文
* @param Map<String, List<String>> params 路由参数
* */

var indexHandler =
    Handler(handlerFunc: (context, Map<String, List<String>> params) {
  return const Index();
});

/*
* 创建登录路由 loginHandler
* @param  context 上下文
* @param Map<String, List<String>> params 路由参数
* */

var loginHandler =
    Handler(handlerFunc: (context, Map<String, List<String>> params) {
  return const Login();
});

/*
* 创建404路由 notFoundHandler
* @param  context 上下文
* @param Map<String, List<String>> params 路由参数
* */

var notFoundHandler =
    Handler(handlerFunc: (context, Map<String, List<String>> params) {
  return const NotFound();
});

```

##### 3.声明路由

1. 创建文件 `Routes.dart`

```dart
import 'package:flutter/material.dart';
import 'package:fluro/fluro.dart';
import 'RoutesHandler.dart';

class Routes {
  // 声明路由
  static void configureRoutes(FluroRouter router) {
    router.define('/', handler: indexHandler);
    router.define('/login', handler: loginHandler);
    router.notFoundHandler = notFoundHandler; // 404
  }
}

```

##### 4.使用路由

1. 创建文件 `/lib/utils/Global.dart`，存放全局类

```dart
import 'package:flutter/material.dart';
import 'package:fluro/fluro.dart';

class G {
  /*
  * 在Dart 2.12中添加了late关键字，他的作用：
  * 1.显式声明一个非空的变量，但不初始化
  * 2.延迟初始化变量
  * */
  static late FluroRouter router;
}

```

1.  `main.dart`

```dart
...
import 'Routes/Routes.dart';
import 'utils/Global.dart';
void main() {
  // 初始化路由
  FluroRouter router = FluroRouter();
  Routes.configureRoutes(router);
  // 初始化后的路由，加入全局组件
  G.router = router;
  ...
}

class MyApp extends StatelessWidget {
  ...

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      ...
      // home: Index(),
      onGenerateRoute: G.router.generator,
      initialRoute: '/',
    );
  }
}

```

#### 设置自定义字体

-   下载并导入字体
    -   解压压缩包，将字体文件复制到 Flutter 项目中
-   在 pubspec.yaml 中声明字体

```
flutter:
  fonts:
  # family 属性决定J字体的名称， 你将会在TextStyle 的fontFamily 属性中用到。
  - family: SourceSansPro
    fonts:
      - asset:fonts/Source_Sans_Pro/SourceSansPro-Black.ttf
      - asset:fonts/Source_Sans_Pro/SourceSansPro-BlackItalic.ttf
      # weight 属性指定T文件中字体轮廓的字重为100的整数倍
      weight: 400
      # style 属性指定文件中字体的轮廓是否为italic或normal
      style: normaL
```

-   使用
    -   为整个应用设置默认自定义字体

```dart
 return MaterialApp(
   theme:ThemeData(fontFamily:'SourceSansPro')
 )
```

    -   为某个组件设置自定义字体

```dart
Text(
  style: TextStyle(
   fontFamily:'SourceSansPro'
  )
)
```

---

#### Color

-   Color（自定义颜色）
    -   Flutter 中通过 ARGB 来声明颜色

```dart
const Color(Ox42A5F5); // 16进制的ARGB=透8 度+ 六位十六进制颜色
const Color.fromARGB(OxFF, 0x42, 0xA5, 0xF5);
const Color.fromARGB(255, 66, 165, 245);
const Color.fromRGBO(66, 165, 245, 1.0); // 0 = Opacity
```

-   Colors（英文字母声明的颜色）

```dart
Colors.red
```

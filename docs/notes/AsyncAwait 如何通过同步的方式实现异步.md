# `Async/Await` 如何通过同步的方式实现异步

首先想要更好的理解 `Async/Await`，需要了解这两个知识点：

-   同步
-   异步

首先，`JavaScript` 是单线程的（重复三遍），所谓单线程，就是执行代码是一行一行的往下走（即所谓的同步），如果上面的没执行完，就痴痴的等着，举个例子：

```JavaScript
// chrome 81
function test() {
  let d = Date.now();
  for (let i = 0; i < 1e8; i++) {}
  console.log(Date.now() - d); // 62ms-90ms左右
}
function test1() {
  let d = Date.now();
  console.log(Date.now() - d); // 0
}
test();
test1();
```

上面仅仅是一个 `for` 循环，而在实际应用中，会有大量的网络请求，它的响应时间是不确定的，这种情况下也要痴痴的等么？显然是不行的，因而 `JavaScript` 设计了异步，即发起网络请求（诸如 IO 操作，定时器），由于需要等服务器响应，就先不理会，而是去做其他的事儿，等请求返回了结果的时候再说（即异步）。

那么如何实现异步呢？其实我们平时已经在大量使用了，那就是 `callback`，例如：

```JavaScript
// 网络请求
$.ajax({
  url: 'http://xxx',
  success: function(res) {
    console.log(res);
  },
});
```

`success` 作为函数传递过去并不会立即执行，而是等请求成功了才执行，即回调函数`callback`:

```JavaScript
// IO操作
const fs = require('fs');

fs.rename('旧文件.txt', '新文件.txt', err => {
  if (err) throw err;
  console.log('重命名完成');
});
```

和网络请求类似，等到 IO 操作有了结果（无论成功与否）才会执行第三个参数：`(err)=>{}`
从上面我们就可以看出，实现异步的核心就是回调钩子，将 `callback` 作为参数传递给异步执行函数，当有了结果后在触发 `callback`。
至于 `async/await` 是如何出现的呢，在 `es6` 之前，大多 `JavaScript` 数项目中会有类似这样的代码：

```JavaScript
ajax1(url, () => {
  // do something 1
  ajax2(url, () => {
    // do something 2
    ajax3(url, () => {
      // do something 3
      // ...
    });
  });
});
```

这种函数嵌套，大量的回调函数，使代码阅读起来晦涩难懂，不直观，形象的称之为回调地狱(callback hell)，所以为了在写法上能更通俗一点，es6+陆续出现了 `Promise`、`Generator`、`Async/await`，力求在写法上简洁明了（扁平化），可读性强（更优雅、更简洁）。

**`async/await` 是参照 `Generator` 封装的一套异步处理方案，可以理解为 `Generator` 的语法糖。**

> `async/await` 是 ES2017 引入的新语法，用于更简洁地处理 `JavaScript` 异步操作。它与 `Generator` 有密切关系，内部实现上使用了 `Generator` 的自动执行器。从语法上来看,`async/await` 看起来更像同步代码，避免了 `Generator` 那种流程控制型的星号和 `yield` 语法。`async/await` 可以认为是 `Generator` 的语法糖，提供了一种更友好的语法方式来编写异步代码。使用 `async/await` 我们可以写出更类似同步代码的异步逻辑，但其仍然是非阻塞的异步操作。`async/await` 建立在 `Promise` 的基础上，利用 `Promise` 对象处理异步操作结果。`async` 声明一个异步函数，`await` 用于等待一个异步操作完成获取结果。

#### 什么是 `Generator` ？

`Generator`(生成器)是`ES6`中新增的一种异步编程解决方案。其主要特征包括:

-   `Generator` 函数由 `function *`定义，内部可以通过 `yield` 暂停执行。
-   调用 `Generator` 函数后，并不会立即执行，而是返回一个迭代器对象。
-   通过迭代器的 `next()` 方法可以分段执行 `Generator` 函数内部的代码。
-   每次调用 `next()` 会执行至下一个 `yield` 语句为止，`yield` 语句可以返回值，作为 `next()` 的返回值。
-   `Generator` 可以用于处理回调金字塔问题，也可以配合 `Promise` 等异步编程方式使用。
-   需要注意 `Generator` 函数本身是同步的，异步效果需要配合其他异步操作实现。
-   `Generator` 已被 `async/await` 等新方案大量取代，但仍然可以提供强大的异步控制能力。

总结来说，`Generator` 函数可以分段执行，`Yield` 表达式可以交出函数的控制权，这为异步编程提供了可能。它开启了 `JavaScript` 异步编程的新篇章。

#### `Yield`表达式可以交出函数的控制权，谁拿到这个控制权？

在 `Generator` 函数中，`yield` 表达式可以交出函数的执行控制权，那么这个控制权具体交给谁呢？

-   当 `Generator` 函数被调用时，会返回一个迭代器对象。这个迭代器对象拿到了 `Generator` 函数的控制权。
-   通过迭代器的 `next()` 方法可以恢复执行 `Generator` 函数,每次 `next()` 调用会执行到下一个 `yield` 位置为止。
-   所以可以说，`yield` 表达式将控制权交给了调用它的迭代器对象。
-   迭代器对象可以决定何时恢复 `Generator` 函数的执行,以及传入何值给 `yield` 表达式。
-   我们通常不会直接使用迭代器对象,而是通过 `Generator` 函数的自动执行器,比如 `Thunk` 函数、`Promise` 等。
-   这些自动执行器会反复调用迭代器的 `next()` 方法,从而接管 `Generator` 的控制权,实现异步流程管理。

简单来说，`yield` 表达式交出的控制权,是给调用它的迭代器对象的。而我们通过让自动执行器来调用这个迭代器,实现对 `Generator` 的驱动,从而实现异步编程。
通过一个简单的示例代码来解释 `yield` 表达式交出控制权的过程:

```JavaScript
// 一个 Generator 函数
function* genFunc() {
  console.log('代码段1')
  yield 'yield点1'
  console.log('代码段2')
  yield 'yield点2'
  console.log('代码段3')
}

// 调用函数,获取迭代器对象
const iterator = genFunc()

// 第一次调用next(),执行到第一个yield为止
iterator.next()
// 输出:代码段1

// 再次调用next(),执行到第二个yield为止
iterator.next()
// 输出:代码段2

// 再次调用next(),执行到函数结束
iterator.next()
// 输出:代码段3
```

通过这个示例可以看出:

-   `Generator` 函数执行后会返回一个迭代器对象 `iterator`
-   每次调用 `iterator` 的 `next()` 方法,会恢复执行 `Generator` 函数,遇到 `yield` 表达式就暂停
-   这样控制权就通过 `yield` 表达式交给了调用它的迭代器 `iterator`
-   迭代器可以决定何时通过 `next()` 恢复执行 `Generator` 函数

这样就实现了 `Generator` 的控制权交接,从而可以用于异步编程场景中。同时我们还能看到，可以看到,函数内部的日志代码是顺序同步执行的。之所以能实现异步效果,是因为可以通过 `yield` 中断函数执行流程,进行信息交换。所以说，此时的异步并不是真正的异步,而是利用同步代码实现的模拟异步。真正的异步需要 `Generator` 配合 `Promise`、事件监听等机制,将控制权完全交出,从而实现对异步操作的等待。这也是理解 `Generator` 异步效果的关键。

#### 下面我们用一段代码演示 `Generator` 是如何配合 `Promise` 实现异步操作的

```JavaScript
function getUser() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: 'John' });
    }, 1000);
  });
}
function* main() {
  const user = yield getUser();
  console.log(user);
}
const g = main();
g.next().value.then(data => {
  g.next(data);
});
```

在上述代码中:

-   `getUser` 返回一个 `Promise`
-   在 `Generator` 中通过 `yield` 获取 `Promise` 的结果 `user`
-   `yield` 后的 `getUser()` 会立即执行并返回 `Promise` 对象
-   通过 `g.next().value` 可以获取这个 `Promise` 对象
-   然后在 `Promise` 的 `then` 回调中,将结果数据传入 `g.next(data)`,恢复 `Generator` 的执行
-   这样当 `Promise resolve` 后,就可以在 `Generator` 内部通过 `yield` 拿到结果了

通过上面这种配合,`Generator` 和 `Promise` 可以协作,从而实现真正的异步代码的同步化处理。

看到这里，你可能会问，`Generator` 和 `callback` 有啥关系，如何处理异步呢？其实二者没有任何关系，我们只是通过一些方式强行的它们产生了关系，才会有 `Generator` 处理异步。

我们来总结一下 `Generator` 的本质：暂停，它会让程序执行到指定位置先暂停（`yield`），然后再启动（`next`），再暂停（`yield`），再启动（`next`），而这个暂停就很容易让它和异步操作产生联系，因为我们在处理异步时：开始异步处理（网络求情、IO 操作），然后暂停一下，等处理完了，再该干嘛干嘛。不过值得注意的是，`JavaScript` 是单线程的，异步还是异步，`callback` 还是 `callback`，不会因为 `Generator` 而有任何改变。

#### 怎么还没讲到 `async/await` 💢

来了来了……之前我们说过，`async/await` 是 `Generator` 的语法糖，先上一段代码看一下两者的对比。

首先，我们实现一个针对 `Generator` 函数的自动执行器 `run` ,可以自动执行 `Generator` 函数内的异步逻辑。

```JavaScript
function run(gen) {
  const g = gen(); // `run` 接收一个 `Generator` 函数作为参数。在内部，调用该 `Generator` 函数,并赋值给变量 `g`。
  function next(data) { // 定义 `next` 函数,用来执行 `Generator` 的每一步。
    const res = g.next(data); // 在 `next` 内部，首先调用 `g.next(data)` 执行当前步，获取返回结果 `res`。
    // 深度递归，只要 `Generator` 函数还没执行到最后一步，`next` 函数就调用自身
    if (res.done) return res.value; // 检查 `res.done`，如果为 `true`，表示 `Generator` 执行完毕，返回结果。
    res.value.then(function(data) { // 否则表示还有下一步需要执行
      next(data); // 这时候 `res.value` 是一个 `Promise`，需要等待它 `resolve`，然后再次调用 `next` 触发下一步执行。
    });
  }
  next(); // 通过递归调用 `next` 函数，实现自动按步执行整个 `Generator` 函数流程
}

run(function*() {
  // 调用 `run` 时,传入一个示例 `Generator` 函数,该函数 `yield` 两个 `Promise`。
  const res1 = yield Promise.resolve({a: 1});
  console.log(res1);
  // { "a": 1 }
  const res2 = yield Promise.resolve({b: 2});
  console.log(res2);
  // { "b": 2 }
});
// `run` 会自动执行这个 `Generator`，并在 `Promise resolve` 后继续执行下一步，从而实现异步自动流程管理。
```

如果我们用 `async/await` 的方式如何实现这个方法呢？请往下看：

```JavaScript
// async/await
const aa = async ()=>{
  const res1 = await Promise.resolve({a: 1});
  console.log(res1);

  const res2 = await Promise.resolve({b: 2});
  console.log(res2);
  return 'done';
}

const res = aa();
```

可以看到，`async function` 代替了` function*`，`await` 代替了 `yield`，同时也无需自己手写一个自动执行器 `run` 了

现在再来看看 `async/await` 的特点：

-   当 `await` 后面跟的是 `Promise` 对象时，才会异步执行，其它类型的数据会同步执行
-   执行 `const res = aa();` 返回的仍然是个 `Promise` 对象，上面代码中的 `return 'done'` 会直接被下面 `then` 函数接收到：

```JavaScript
res.then(data => {
  console.log(data); // done
});
```

好了，最后我们在总结一下，`async/await` 相比 `Promise` 和 `Generator`，通过使用同步代码的流程控制实现异步，避免了回调地狱问题和 `Promise` 的 `then/catch` 嵌套，解决之前异步代码结构复杂，难以维护的问题，使得代码更接近同步代码写法,可读性更高。相比起星号和 `yield`，`async/await`语义更清楚，返回值更统一。

💡 **但是，**我们在使用`async/await`过程中还是要注意几个问题：

-   `await` 命令后面的 `Promise` 对象，运行结果可能是 `rejected`，所以最好把 `await` 命令放在 `try...catch` 代码块中（后面还有彩蛋）
-   `await` 命令只能用在 `async` 函数之中，如果用在普通函数，就会报错
-   多个 `await` 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发（`Promise.all`）
-   在循环中需注意它的使用，尽量在 `for/for..of`（迭代遍历器） 中使用，永远不要在 `forEach/filter` 中使用，也尽量不要在 `map` 中使用
-   兼容性不太好，当然一般情况下，可以借助编译工具来进行 `polyfill` 或 `es6-shim`
-   可以在生命周期函数中使用
-   错误捕获：需要捕获多个错误并做不同的处理时，可以考虑给 `await` 后的 `promise` 对象添加 `catch` 函数

#### 🥚 彩蛋

我们实现一个 `to` 函数,可以将 `Promise` 转换为符合 `async/await` 语法的结构，方便我们在 `async/await` 中处理 `Promise` 的结果，同时也不需要再显式地写多层 `then/catch` 嵌套，简化了异步代码的处理：

```JavaScript
// to.js
export default function to(promise) { // `to` 函数接收一个 `Promise` 对象作为参数，并将 `Promise` 结果转换为一个统一的数组结构
  return promise.then(data => {
    return [null, data]; // 在内部,调用该 `Promise` 的 `then` 方法,如果成功,返回一个数组 `[null, data]`
  })
  .catch(err => [err]); // 如果 `Promise` 被 `reject`,则在 `catch` 中返回 `[err]`
}

/***使用***/
import to from './to';
async function asyncTask() {
  const [err1, res1] = await to(fn1); // 在 `async` 函数中,使用 `await to(promise)` 的方式调用，可以获取数组解构的结果 `[err, data]`，如果 `data` 存在,表示 `Promise resolve`,可以直接使用
  if(!res1) throw new Error('No res1 found');
  const [err2, res2] = await to(fn2);
  if(err) throw new Error('Error occurred while task2'); // // 如果 err 存在,表示 Promise reject,可以 throw 自定义错误
}

```

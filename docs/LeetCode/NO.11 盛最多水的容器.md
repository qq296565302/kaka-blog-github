# 盛最多水的容器

中等

> 给定一个长度为 `n` 的整数数组 `height` 。有 `n` 条垂线，第 `i` 条线的两个端点是 `(i, 0)` 和 `(i, height[i])` 。找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。

> 说明：你不能倾斜容器。

示例 1：
输入：[1,8,6,2,5,4,8,3,7]
输出：49
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

示例 2：
输入：height = [1,1]
输出：1

提示：

-   `n == height.length`
-   `2 <= n <= 105`
-   `0 <= height[i] <= 104`

---

解决这个问题的常见方法是使用双指针法，从容器的两侧开始向中间移动指针，每次移动较矮的那根线，同时更新容器的容量。这个过程中，保留当前容器的最大容量，直到两个指针相遇。有关双指针算法说明参考《NO.1 两数之和》。

```JavaScript
/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function(height) {
  let left = 0 // 左指针初始位置
  let right = height.length - 1 // 右指针初始位置
  let result = 0  // 最大容量的初始值
  while (left < right) {
    // 计算当前容器的容量，取两个指针指向的高度中较小的一个乘以宽度
    const count = Math.min(height[left], height[right]) * (right - left);
    // 移动指针
    (height[left] < height[right]) ? left++ : right--;
    // 更新最大容量
    result = Math.max(count, result);
  }
  return result
};

// 测试示例
const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
const result = maxArea(height);
console.log(result); // 输出 49，表示最大容器容量为 49
```

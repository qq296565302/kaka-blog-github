# 移动零

简单

> 给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。请注意 ，必须在不复制数组的情况下原地对数组进行操作。

示例 1:
输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]

示例 2:
输入: nums = [0]
输出: [0]

提示:

-   `1 <= nums.length <= 104`
-   `-231 <= nums[i] <= 231 - 1`

---

#### 解一：ChatGPT 提供的算法解

通过维护一个非零元素的位置 `nonZeroIndex`，遍历数组，将非零元素逐个移动到 `nonZeroIndex` 的位置上，同时将当前位置置为零。这样，最终所有的零都被移动到了数组的末尾，而非零元素的相对顺序保持不变。leetcode 执行用时 108ms，消耗内存 45.8MB。
这个算法的时间复杂度是 `O(n)`，其中 `n` 是数组的长度，因为我们只需要遍历数组一次。

```JavaScript
function moveZeroes(nums) {
    let nonZeroIndex = 0; // 用于记录非零元素的位置
    // 遍历数组
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            // 如果当前元素不是零，将其移动到非零元素的位置
            nums[nonZeroIndex] = nums[i];
            // 如果非零元素的位置和当前位置不相同，说明发生了移动，将当前位置置为零
            if (nonZeroIndex !== i) {
                nums[i] = 0;
            }
            // 非零元素的位置向右移动
            nonZeroIndex++;
        }
    }
}

// 测试示例
const nums = [0, 1, 0, 3, 12];
moveZeroes(nums);
console.log(nums); // 输出 [1, 3, 12, 0, 0]
```

#### 解二：自解，双指针算法

通过维护两个指针 `left` 和 `right`，从左到右遍历数组，确保在 `left` 左侧的元素都非零，而 `left` 到 `right` 之间的元素都为零。然后，通过交换非零元素和零的位置来实现移动零的目标。leetcode 执行用时 76ms，消耗内存 45.8MB。
这个算法的时间复杂度也是 `O(n)`，其中 `n` 是数组的长度，因为只需要一次遍历整个数组来完成移动操作。这是一个有效的解决方案。

```JavaScript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const moveZeroes = function(nums) {
  // 如果数组长度小于 2，返回原数组
  if (nums.length <= 1) return nums
  // 初始化 left 和 right 两个指针
  let left = 0
  let right = 1
  // 当右指针小于数组长度时，遍历数组
  while (right < nums.length) {
    // 左指针 等于 0 时
    if (nums[left] === 0) {
      // 右指针 不等于 0 时
      if (nums[right] !== 0) {
        // 位置互换
        const temp = nums[right]
        nums[left] = temp
        nums[right] = 0
        // 左指针 + 1
        left++
      }
      // 右指针 + 1
      right++
    }
    // 左指针 不等于 0 时
    if (nums[left] !== 0) {
      right++
      left++
    }
  }
  return nums
};

// 测试示例
const nums = [0, 1, 0, 3, 12];
moveZeroes(nums);
console.log(nums); // 输出 [1, 3, 12, 0, 0]
```

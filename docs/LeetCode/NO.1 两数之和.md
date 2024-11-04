# 两数之和

简单

> 给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 和为目标值 `target` 的那 两个 整数，并返回它们的数组下标。你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。你可以按任意顺序返回答案。

示例 1：
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

示例 2：
输入：nums = [3,2,4], target = 6
输出：[1,2]

示例 3：
输入：nums = [3,3], target = 6
输出：[0,1]

提示：

-   `2 <= nums.length <= 104`
-   `-109 <= nums[i] <= 109`
-   `-109 <= target <= 109`
-   只会存在一个有效答案

---

解一：双指针算法

```JavaScript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // 创建一个新的数组，将原始数组元素及其下标一起存储
    const numsWithIndex = nums.map((num, index) => ({ num, index }));
    // 对新数组按照元素大小进行排序
    numsWithIndex.sort((a, b) => a.num - b.num);
    // 初始化左右指针
    let left = 0;
    let right = nums.length - 1;
    // 使用双指针查找满足条件的两个元素
    while (left < right) {
        const sum = numsWithIndex[left].num + numsWithIndex[right].num;

        if (sum === target) {
            return [numsWithIndex[left].index, numsWithIndex[right].index];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    // 如果没有找到符合条件的两个元素，返回一个空数组
    return [];
};
// 测试示例
const nums = [2, 7, 11, 15];
const target = 9;
const result = twoSum(nums, target);
console.log(result); // 输出 [0, 1]，因为 nums[0] + nums[1] = 2 + 7 = 9
```

双指针算法是一种常用于数组和链表等数据结构的算法，它通常用于解决满足一定条件的两个元素或子数组的问题。这两个指针可以同时向数组中移动，也可以一个快指针移动得快，另一个慢指针移动得慢，根据问题的需要而定。

在上面的示例中，我们使用了一种双指针的算法来解决找出数组中和为目标值的两个元素的问题。

下面是这个算法的基本思想：

我们将原始数组中的每个元素及其下标一起存储在一个新的数组中，这样就可以跟踪元素的原始位置。接下来，对新数组按照元素的大小进行排序。这个排序步骤是为了使后续的双指针操作更容易进行，因为我们可以根据元素的大小来移动指针。初始化两个指针，一个指向排序后的数组的最左边（left = 0），另一个指向最右边（right = 数组长度 - 1）。

使用双指针进行查找。首先，计算左指针和右指针所指元素的和。如果这个和等于目标值，那么就找到了满足条件的两个元素，返回它们的下标。如果和小于目标值，说明需要增加和，所以左指针向右移动一步。如果和大于目标值，说明需要减小和，所以右指针向左移动一步。然后重复这个过程，直到找到满足条件的两个元素或者左指针超过了右指针，表示没有找到符合条件的元素。如果没有找到符合条件的两个元素，返回一个空数组。

这种双指针算法的优点是它在时间复杂度上通常比暴力搜索更高效，因为它充分利用了已排序数组的特性。它适用于解决一些特定的问题，如查找两个元素的和等于目标值的情况，或者查找一个数组中的两个元素之间的某种关系等。

---

解二：使用哈希表（HashMap）

```JavaScript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // 创建一个哈希表，用于存储数组元素和它们的下标
    const numToIndex = new Map();
    // 遍历数组
    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        const complement = target - currentNum;
        // 如果在哈希表中找到了与当前元素相加等于目标值的元素
        if (numToIndex.has(complement)) {
            // 返回它们的下标
            return [numToIndex.get(complement), i];
        }
        // 否则，在哈希表中记录当前元素及其下标
        numToIndex.set(currentNum, i);
    }
    // 如果没有找到符合条件的两个元素，返回一个空数组
    return [];
}

// 测试示例
const nums = [2, 7, 11, 15];
const target = 9;
const result = twoSum(nums, target);
console.log(result); // 输出 [0, 1]，因为 nums[0] + nums[1] = 2 + 7 = 9
```

使用哈希表的算法是解决在数组中查找和为目标值的两个元素的一种常见方法。下面是这种算法的基本思想：

创建一个空的哈希表（HashMap）或者 `JavaScript` 中的 `Map` 数据结构。这个哈希表将用于存储数组元素和它们的下标。

遍历给定的整数数组 `nums`，对于每个元素 `num`，执行以下步骤：

计算目标值与当前元素的差值 `complement`，即 `complement = target - num`。
在哈希表中查找是否存在键值等于 `complement` 的元素。如果存在，说明找到了两个元素的和等于目标值，返回它们的下标。
如果不存在，将当前元素 num 以及它的下标存入哈希表中，以便后续的查找。
如果遍历完整个数组都没有找到满足条件的两个元素，返回一个空数组，表示没有符合条件的解。

这种算法的关键在于利用哈希表的快速查找特性，通过查找差值 `complement` 是否存在于哈希表中，来确定是否找到了满足条件的两个元素。

这个算法的时间复杂度为 `O(n)`，其中 `n` 是数组的长度。因为在哈希表中查找元素的时间复杂度是 `O(1)`，并且只需遍历数组一次，所以总的时间复杂度是线性的，非常高效。

使用哈希表的算法通常适用于需要快速查找元素之间关系的问题，如在数组中查找和为目标值的两个元素，或者在字符串中查找重复的子串等。这种算法的优势在于时间复杂度低，但需要额外的空间来存储哈希表。

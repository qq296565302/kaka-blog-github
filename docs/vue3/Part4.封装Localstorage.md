```javascript
/**
 * LocalStorage工具类
 */
class LocalStorage {
	constructor(namespace = '', defaultExpire = 0) {
		this.namespace = namespace;
		this.defaultExpire = defaultExpire;
	}

	/**
	 * 设置一个localStorage
	 * @param {string} key
	 * @param {any} value
	 * @param {number} expire 过期时间，单位为秒，如果不传则使用defaultExpire
	 */
	setItem(key, value, expire) {
		const data = {
			value,
			expire: expire ? new Date().getTime() + expire * 1000 : 0,
		};
		localStorage.setItem(`${this.namespace}${key}`, JSON.stringify(data));
	}

	/**
	 * 获取一个localStorage
	 * @param {string} key
	 * @returns {any} 如果该localStorage不存在或已过期，则返回undefined
	 */
	getItem(key) {
		const data = localStorage.getItem(`${this.namespace}${key}`);
		if (!data) return undefined;
		try {
			const parsed = JSON.parse(data);
			if (parsed.expire === 0 || parsed.expire >= new Date().getTime()) {
				return parsed.value;
			}
			this.removeItem(key);
			return undefined;
		} catch (e) {
			return undefined;
		}
	}

	/**
	 * 删除一个localStorage
	 * @param {string} key
	 */
	removeItem(key) {
		localStorage.removeItem(`${this.namespace}${key}`);
	}

	/**
	 * 清空所有该命名空间下的localStorage
	 */
	clear() {
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key && key.indexOf(this.namespace) === 0) {
				localStorage.removeItem(key);
				i--;
			}
		}
	}
}

// 使用示例
const local = new LocalStorage('myApp:', 60 * 60); // 命名空间为myApp，缓存过期时间为1小时
local.setItem('key1', 'value1'); // 设置key1的值为value1，缓存过期时间为1小时
local.getItem('key1'); // 获取key1的值，如果缓存已过期或不存在则返回undefined
local.removeItem('key1'); // 删除key1的值
local.clear(); // 清空所有缓存
```

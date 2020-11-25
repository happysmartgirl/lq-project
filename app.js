// 立即执行函数 
(function (Vue) {
	'use strict';// 开始js的代码的严格模式，约束代码规范
	// 编写自己的逻辑 
	var vm = new Vue({
		el: "#todoapp",
		data: {
			// todos的列表，默认是空数组 
			// 取
			todos: JSON.parse(window.localStorage.getItem('todos')) || [],
			// 当前选择的类型  all  active  completed  
			type: 'all',


			// 记录当前todo的下标
			currentIndex: -1
		},
		// 计算属性
		computed: {

			/*
				如果所有的todo都完成了，completed值为true，
				toggleAll复选框需要高亮 否则不高亮 
			*/
			isAllToDosCompleted() {
				/*
				var flag = true;
				for(var i = 0; i < this.todos.length; i++) {
					if(!this.todos[i].completed) {
						flag = false;
						break;
					}
				}
				return flag;*/

				return this.todos.every(function(todo) {
					return todo.completed;
				});
			},


			// 是否有已完成的todo
			hasToDoCompleted() {
				return this.todos.some(function(todo) {
					return todo.completed;
				});
			},

			// 计算出未完成todos的长度 
			unCompletedToDosLength() {
				// 过滤
				return this.todos.filter(function(todo) {
					return !todo.completed;
				}).length;
			},
			filteredToDos() {
				switch(this.type) {
					case 'all':
						return this.todos;
					case 'active':
						return this.todos.filter(todo => !todo.completed);
					case 'completed':
						return this.todos.filter(todo => todo.completed);

				}
			},
		},
		methods: {
			// 添加todo 
			addToDo(ev) {
				var value = ev.target.value.trim();
				// 非空校验 
				if(value) {
					this.todos.push({
						// id: Math.random()  随机数
						id: Date.now(),// 时间戳 
						name: value,// 文本框的值
						completed: false // 是否完成的状态，默认都没完成，false
					});
				}
				// 清空input框
				ev.target.value = '';
			},
			// 删除todo
			removeToDo(index) {
				this.todos.splice(index,1);
			},
			// 全选
			toggleAll(ev) {
				this.todos.forEach(todo => todo.completed = ev.target.checked);
			},
			// 删除所有完成的todo
			deleteAllCompletedToDos() {
				this.todos = this.todos.filter(todo => !todo.completed);
			},

			// 双击编辑todo
			edit(index) {
				this.currentIndex = index;
			},
			editToDo(index,ev) {
				var val = ev.target.value.trim();
				if(!val) {
					// 删除todo
					return this.todos.splice(index,1);
				}
				// 退出编辑 
				this.exit();
			},
			exit() {
				this.currentIndex = -1;
			}
		},
		watch: {
			// 监视
			todos: {
				deep: true,
				handler(newVal) {
					// 存
					window.localStorage.setItem('todos',JSON.stringify(newVal));
				}
			}
		}
	});
	// 监听hashchange事件 
	window.addEventListener('hashchange',function() {
		vm.type = window.location.hash.slice(2) || 'all';
	});
})(Vue);  



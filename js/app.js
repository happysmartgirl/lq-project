(function (Vue) {
	'use strict';//开启严格模式，约束JS代码规范


	var vm=new Vue({
		el:'#todoapp',
		data:{
			arr:JSON.parse(window.localStorage.getItem('arr'))||[],
			isCompleted:false,
			type:'all',
			currentIndex:-1
		},
		methods:{
			
			add(e){
				if(e.target.value.trim()){
					this.arr.push({id:new Date().getTime,name:e.target.value,isCompleted:this.isCompleted})
				}
				e.target.value=''
			},
			remove(index){
				this.arr.splice(index,1)
			},
			toggleAll(e){
				console.log(e)
				this.arr.forEach(item=>item.isCompleted=e.target.checked)
			},	
			del(){
				this.arr=this.arr.filter(item=>!item.isCompleted)
			},
			enteredit(index){
				this.currentIndex=index
				console.log(this.currentIndex)
			},
			edit(index,e){
				console.log(e.target.value)
				this.arr[index].name=e.target.value
				this.currentIndex=-1
			},
			esc(){
				this.currentIndex=-1
			}
		},
		computed:{
			fm(){
				return this.arr.every(item=>item.isCompleted)
			},
			unCompleted(){
				return this.arr.filter(function(item){
					return item.isCompleted;
				})
			},
			hasuncompleted(){
				return this.arr.some(function(item){
					return item.isCompleted
				})
			},
			filter(){
				switch(this.type){
					case 'all':
						return this.arr
					
					case 'active':
						return this.arr.filter(item=>!item.isCompleted)
					
					case "completed":
						return this.arr.filter(item=>item.isCompleted)
				}
			}
		},
		watch:{
			arr:{
				deep:true,
				handler(newVal){
					window.localStorage.setItem('arr',JSON.stringify(newVal))
				}
			}
		},
		directives:{
			focus(el,binding){
				el.focus()
			}
		}
	})
	window.addEventListener('hashchange',function(){
		console.log(window.location.hash.slice(2))
		vm.type=window.location.hash.slice(2)||'all'
	})
})(Vue);
     
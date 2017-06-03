<template>
	<div id="app">
		<div class="title">
			{{title}}
		</div>
		<div class="main">
			<div class="in">
				<div class="voice">
					{{voice}}
					<span>{{time}}</span>
				</div>
				<div class="content">
					<ul>
						<li v-for="i in arr">
							<div class="logo">
								<img :src="i.logo" :title="i.title">
							</div>
							<div class="text">
								{{i.content}}
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="question">
			<div class="in">
				<input type="text" class="input" v-model="content">
				<span class="btn" @click="send()">发送</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			title:'前端狗',
			user:'老辣鸡',
			logo1:'img/logo1.jpg',
			logo2:'img/logo2.jpg',
			voice:'什么？ 又有Bug？',
			time:'',
			content:'',
			arr:[]
		}
	},
	created(){
		let localtime=new Date()
		let time=localtime.getFullYear() + '-' + parseInt(localtime.getMonth() + 1) + '-' + localtime.getDate()
		this.time=time
	},
	mounted(){
		let obj=new Object()
		obj.logo=this.logo1
		obj.title=this.title
		obj.content='hello，我是前端狗！'
		this.arr.push(obj)

	},
	methods:{
		send(){
			let content=this.content
			if( content != '' ){
				let obj= new Object()
				obj.logo=this.logo2
				obj.title=this.user
				obj.content=content
				this.arr.push(obj)

				axios.get(`http://wo2.me:8089?search=${content}`).then(data=>{
					let obj= new Object()
					obj.logo=this.logo1
					obj.title=this.title
			        if( data.status!=200 ){
			        	obj.content='你说啥？没听清，是不是你的网络有问题？'
			        }else{
			        	obj.content=data.data.content!=''?data.data.content:'这。。。我也不知道！'
			        }

			        this.arr.push(obj)

			        this.scrollD()
			    })
			}
		},
		scrollD(){
			let div=document.querySelector('.main .in')
			div.scrollTop = div.scrollHeight
		}
	}
}
</script>
<style>
	*{
		margin: 0;
		padding: 0;
		list-style: none;
		border: none;
		outline: none;
	}
	html,body,#app{
		width: 100%;
		height: 100%;
		overflow: hidden;
		font-size: 12px;
		font-family: 'Open Sans', 'Helvetica Neue', 'Hiragino Sans GB', 'LiHei Pro', Arial, sans-serif;
		background: #EEE;
		color: #7D8B99;
	}
	a{
		text-decoration: none;
	}
	#app .title{
		height: 50px;
		line-height: 50px;
		text-align: center;
		border-bottom: 1px solid rgba(30,35,42,.06);
		box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);
		background: #FFF;
	}
	#app .main{
		width: 100%;
		height: calc( 100% - 100px );
	}
	#app .main .in{
		width: calc(100% + 30px);
		height: 100%;
		overflow: scroll;
		overflow-x: hidden;
	}
	#app .main .voice{
		max-width: 350px;
		min-height: 2em;
		padding: 1em;
		padding-bottom: 1.5em;
		background: #FFF;
		border-radius: 2px;
		box-shadow:1px 1px 4px rgba(0, 0, 0, .25);
		margin: 30px auto;
		position: relative;
	}
	#app .main .voice span{
		position: absolute;
		right: 1em;
		bottom: 0.5em;
	}
	#app .content li{
		display: flex;
		margin: 10px 0;
	}
	#app .content li:nth-child(2n){
		flex-direction:row-reverse;
	}
	#app .content .logo{
		cursor: pointer;
		width: 50px;
		margin: 0 2em;
	}
	#app .content .logo img{
		width: 100%;
	}
	#app .content .text{
		padding: 1em;
		border-radius: 5px;
		border: 1px solid #ccc;
		background: #FFF;
		max-width: 70%;
		line-height: 1.5;
		letter-spacing: 2px;
	}
	#app .question{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 10px 0;
		border-top: 1px solid rgba(30,35,42,.06);
		background: #FFF;
		display: flex;
	}
	#app .question .in{
		display: inline-block;
		text-align: center;
		margin: 0 auto;
		overflow: hidden;
	}
	#app .question .input{
		padding-left: 0.5em;
		border: 1px solid #ccc;
		border-radius: 3px;
		width: 350px;
		height: 30px;
		float: left;
	}
	#app .question .btn{
		padding:0 8px;
		border-radius: 2px;
		background: #FFF;
		border: 1px solid #ccc;
		cursor: pointer;
		float: left;
		margin-left: 1em;
		height: 30px;
		line-height: 30px;
	}
	#app .question .btn:hover{
		color: #3C3C3C;
	}
	@media screen and (max-width:500px) {
		#app .question .input{
			width: auto;
		}
		#app .main .voice{
			width: 70%;
		}
	}
</style>

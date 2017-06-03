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
				<input type="text" class="input" v-model="content" @keydown.13="send()">
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
			voice:'',
			time:'',
			content:'',
			single:true,
			arr:[]
		}
	},
	created(){

		let localtime= new Date()
		let time= localtime.getFullYear() + '-' + parseInt(localtime.getMonth() + 1) + '-' + localtime.getDate()
		this.time= time
		this.voice= this.act()
	},
	mounted(){
		let time= null
		time=setTimeout( () =>{
			this.create('在下Fedog，略懂WEB开发。你可以向我提问！')
			clearTimeout(time)
		}, 1000)
	},
	methods:{
		send(){
			if( !this.single ){ return }

			let content=this.content
			if( !content ){ return }
			this.content= ''

			this.single=false
			this.create(content)
			this.title='对方正在输入...'

			axios.get(`//wo2.me:8089?search=${content}`).then(data=>{
				let str=''
		        if( data.status!=200 ){
		        	str='你说啥？没听清，是不是你的网络有问题？'
		        }else{
		        	str=data.data.content!=''?data.data.content:this.act()
		        }
		        this.title='前端狗'
		        this.create(str)
		        this.single=true
		    })
			
		},
		create(str){
			let obj= new Object()
			let nums= this.arr.length % 2
			if( nums ){
				obj.logo=this.logo2
				obj.title=this.user
			}else{
				obj.logo=this.logo1
				obj.title=this.title
			}
			obj.content=str
			this.arr.push(obj)
			this.scrollD()
		},
		scrollD(){
			let div=document.querySelector('.main .in')
			div.scrollTop = div.scrollHeight
		},
		number(max){
			return Math.round(Math.random() * max)
		},
		act(){
			let arr= [
			'什么？又有Bug？',
			'我写的代码是完美的，不可能有Bug。',
			'世上应该不会有比我更机智的汪了！',
			'听说过AlphaGo吗？对！就那个，那是我大表哥。',
			'我的梦想是买很多很多很多的骨头。',
			'你问我，我问谁去？',
			'多喝热水。',
			'想法总是那么美好，现实却是那么残酷。汪的一生。。。',
			'编程只是我的副业，其实我是一位教育思想家。',
			'PHP是世界上最好的语言！',
			'可以教教我怎么写Bug吗？',
			'这。。。我也不知道啊！'
			]		
			return arr[ this.number(arr.length-1) ]
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
		height: 50px;
		overflow: hidden;
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

<template>
	<div id="home">
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
						<li v-for="(v, k, i) in arr">
							<div class="logo">
								<router-link :to="link(k)">
									<img :src="v.logo" :title="v.title">
								</router-link>
							</div>
							<div class="text" v-html="v.content">
								
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
			logo1:`data:image/webp;base64,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`,
			logo2:`data:image/webp;base64,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`,
			voice:'神剑如我',
			time:'',
			content:'',
			single:true,
			arr:[]
		}
	},
	created(){
		console.log('https://github.com/so-diao/fedog')
		let localtime= new Date()
		let time= localtime.getFullYear() + '-' + parseInt(localtime.getMonth() + 1) + '-' + localtime.getDate()
		this.time= time
	},
	mounted(){
		let search =this.$route.params.search
		this.create('在下Fedog，略懂WEB开发。你可以向我提问！')
		if(search){
			this.content = search
			this.send()
		}
		
	},
	methods:{
		send(){
			
			let content=this.content
			if( !this.single || !content ){ return }
			this.content= ''

			this.single=false
			this.create(content)
			this.title='对方正在输入...'

			axios.get(`//localhost:8089?search=${content}`).then(data=>{
				let str=data.data
		        
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

			let time= null
			time=setTimeout( () =>{
				this.scrollD()
				clearTimeout(time)
			},100)
			
		},
		scrollD(){
			let div=document.querySelector('.main .in')
			div.scrollTop = div.scrollHeight
		},
		link(i){
			return i % 2 ? 'user' : 'admin'
		}
	}
}
</script>
<style scoped>
	#home{
		width: 100%;
		height: 100%;
	}
	#home .title{
		height: 50px;
		line-height: 50px;
		text-align: center;
		border-bottom: 1px solid rgba(30,35,42,.06);
		box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);
		background: #FFF;
	}
	#home .main{
		width: 100%;
		height: calc( 100% - 100px );
	}
	#home .main .in{
		width: calc(100% + 20px);
		height: 100%;
		overflow: scroll;
		overflow-x: hidden;
	}
	#home .main .voice{
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
	#home .main .voice span{
		position: absolute;
		right: 1em;
		bottom: 0.5em;
	}

	#home .content li{
		display: flex;
		margin: 10px 0;
	}
	#home .content li:nth-child(2n){
		flex-direction:row-reverse;
	}
	#home .content .logo{
		cursor: pointer;
		width: 50px;
		margin: 0 1em;
	}
	#home .content .logo img{
		width: 100%;
	}
	#home .content .text{
		padding: 1em;
		border-radius: 5px;
		border: 1px solid #ccc;
		background: #FFF;
		max-width: 70%;
		line-height: 1.5;
		letter-spacing: 2px;
	}
	#home .question{
		overflow: hidden;
		width: 100%;
		padding: 10px 0;
		border-top: 1px solid rgba(30,35,42,.06);
		background: #FFF;
		display: flex;
	}
	#home .question .in{
		display: inline-block;
		text-align: center;
		margin: 0 auto;
		overflow: hidden;
	}
	#home .question .input{
		padding-left: 0.5em;
		border: 1px solid #ccc;
		border-radius: 3px;
		width: 350px;
		height: 30px;
		float: left;
		background: #FFE;
	}
	#home .question .btn{
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
	#home .question .btn:hover{
		color: #3C3C3C;
	}
	@media screen and (max-width:500px) {
		#home .question .input{
			width: auto;
		}
		#home .main .voice{
			width: 70%;
		}
		#home .content{
			width: calc(100% - 20px);
		}
	}
</style>
<style>
	#home .content .text img{
		max-width:100%;
	}
	.text iframe{
		width: 100%;
	}
</style>
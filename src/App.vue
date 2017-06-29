<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<style>
	*{
		margin: 0;
		padding: 0;
		list-style: none;
		border: none;
		outline: none;
		box-shadow: none;
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
		display: block;
		font-size: 0;
	}
	#home .content .text img {
		max-width: 100%;
	}
	.text iframe {
		width: 100%;
	}
	pre {
		white-space: pre-wrap;
		white-space: -moz-pre-wrap;
		white-space: -pre-wrap;
		white-space: -o-pre-wrap;
		word-wrap: break-word;
	}
	input{
		-webkit-appearance:none;
		outline:none
	}
</style>

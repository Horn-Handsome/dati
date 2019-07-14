var tikuList = [];
var currentTimu = {};
var score = 0;
var isChoose = false;
var num = 10;


//Ajax获取题目的内容
$.get("dati.json",function (res) {
	console.log(res)
	tikuList = res;
})



//点击开始答题按钮切换页面
$(".startBtn").click(function (e) {
	$(".gaming").addClass("active")
	$(".startGame").remove(".active")
	randomRender()//调用随机渲染出题目在页面上
})


function randomRender(){
    //parseInt(取整) Math.random(随机数)
	var randomIndex = parseInt(Math.random()*tikuList.length);
	//splice()只取一次,不重复,即出数据顺带销毁
	currentTimu = tikuList.splice(randomIndex,1)[0];
	console.log(currentTimu);
	$(".timu").html(currentTimu.quiz);
    //每次渲染时,都要清空一次
	$(".options").html("");
	//通过forEach()循环出答案,执行一个函数
	currentTimu.options.forEach(function (item,index) {
		//data-index:是css另类的选择器 变量索引"${index}"
		$(".options").append(`<div data-index="${index}">${index+1}:${item}</div>`)
	})
}

$('.options').click(function (e) {
	if(!isChoose){
			console.log(e)
	//获取索引值 parseInt() 将字符串的索引值转换数字
	var index = parseInt(e.target.dataset.index);
		console.log(index+1)	
	if(currentTimu.answer == index+1){
		score += 10;
		/*data-index → css的一种标签,
		'+index+']' → 这个是字符串的拼接,index 是个变量
		三个字符串拼接在形成选择器,选中某种属性等于某个值*/
		$('[data-index='+index+']').addClass("correct")
		
	}else{
		
		 var correctindex = currentTimu.answer -1
		$('[data-index='+correctindex+']').addClass("correct")
		$('[data-index='+index+']').addClass("error")
	}
	isChoose = true;
	
	
	
	num --;
	

    // setTimeout() 延迟两秒切换到下一题 
	setTimeout(function(){
		if(num == 0){
		$(".endGame").addClass("active")
		$(".score").html(score)
	}else{
	
		isChoose = false;
		randomRender()
		}
	},2000)
	}
})
//重新刷新页面即可重新答题 reload()
$(".reStart").click(function () {
	location.reload()
})




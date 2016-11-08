$(function(){
	var sekki = new Sekki();
	var current = sekki.current();
	setSekki(current);

	$(document).on('click', '#random', function(){
		var rand = sekki.random();
		setSekki(rand);
	});
});


function setSekki(sekki) {
	$("title").text(sekki.kou);
	$("#kou").text(sekki.kou);
	$("#kou_kana").text(sekki.kou_kana);
	$("#sekki").text(sekki.sekki);
	$("#date").text(sekki.date);
	$("#meaning").text(sekki.meaning);

	var patterns = ['seigaiha', 'sayagata', 'asanoha'];
	var bg_img = patterns[Math.floor(Math.random()*patterns.length)];
	$("body").css("background", "url('../img/"+bg_img+".png')");

	var hex = sekki.color_code.replace('#','');
	var r = parseInt(hex.substring(0,2), 16);
	var g = parseInt(hex.substring(2,4), 16);
	var b = parseInt(hex.substring(4,6), 16);
	var result = 'rgba('+r+','+g+','+b+',0.7)';


	$('head').append('<style>body:before { background: ' + result + '; } </style>');

	if((r+g+b)>500) {
		$('head').append('<style>#kou, #kou_kana, #meaning, #credit, #credit a { color: #111 !important; } </style>');
	}else {
		$('head').append('<style>#kou, #kou_kana, #meaning, #credit, #credit a { color: #fefefe !important; } </style>');
	}
}

function getFormattedDate() {
	// 今日の日付で Date オブジェクトを作成
	var now = new Date();

	// 「年」「月」「日」「曜日」を Date オブジェクトから取り出してそれぞれに代入
	var y = now.getFullYear();
	var m = ('0' + (now.getMonth()+1)).slice(-2);
	var d = ('0' + (now.getDate())).slice(-2);

	return y + '-' + m + '-' + d;
}

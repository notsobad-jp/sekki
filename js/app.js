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
		$('head').append('<style>#kou, #kou_kana, #meaning { color: #111 !important; } </style>');
	}else {
		$('head').append('<style>#kou, #kou_kana, #meaning { color: #fefefe !important; } </style>');
	}
}

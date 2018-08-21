$(function(){
  var sekki = new Sekki();
  var current = sekki.current();
  setSekki(current);

  // document.fonts.ready.then(function () {
  //   html2canvas(document.body).then(function(canvas){
  //     console.log("finished");
  //     //imgタグのsrcの中に、html2canvasがレンダリングした画像を指定する。
  //     var imgData = canvas.toDataURL();
  //     console.log(imgData);
  //     document.getElementById("result").src = imgData;
  //   });
  // });


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
  $("#meaning").text(sekki.meaning);

  var month = sekki.date.split('/')[0];
  var day = sekki.date.split('/')[1];
  var kanjiDate = toKanjiNum(month) + '月' + toKanjiNum(day) + '日頃';
  $("#date").text(kanjiDate);

  //ツイートURLセット
  var tweetHref = $("#tweet").attr("href");
  tweetHref = tweetHref.replace(/{{sekkiSekki}}/, sekki.sekki)
                       .replace(/{{sekkiKou}}/, sekki.kou)
                       .replace(/{{sekkiKouKana}}/, sekki.kou_kana)
                       .replace(/{{displayDate}}/, kanjiDate)
                       .replace(/{{sekkiMeaning}}/, sekki.meaning)
                       .replace(/{{urlDate}}/, ('0' + month).slice(-2) + day)
  $("#tweet").attr("href", tweetHref);

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
    $('head').append('<style>#kou, #kou_kana, #meaning, #date, #credit, #credit a { color: #111 !important; } </style>');
  }else {
    $('head').append('<style>#kou, #kou_kana, #meaning, #date, #credit, #credit a { color: #fefefe !important; } </style>');
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

function toKanjiNum(num) {
  if(num == 0) {return '〇'; }
  var kan = ["〇","一","二","三","四","五","六","七","八","九"];
  var oneDigit = num % 10;
  var tenDigit = Math.floor(num/10);

  var kanjiNum = '';
  if(tenDigit > 1) { kanjiNum += kan[tenDigit]; }
  if(tenDigit > 0) { kanjiNum += '十'; }
  if(oneDigit > 0) { kanjiNum += kan[oneDigit]; }

  return kanjiNum;
}

var sekkiJSON = "";


$(function(){
  var current = getCurrentSekki();
  setSekki(current);

  $(document).on('click', '#random', function(){
    var rand = getRandomSekki();
    setSekki(rand);
  });
});


//sekki.json読み込み完了時のコールバック。グローバル変数に読み込んだjsonをセット。
function sekkiLoaded(json){
  sekkiJSON = json;
};


//現在の節気を取得
function getCurrentSekki() {
  var date = new Date();
  var row = null;

  sekkiJSON.some(function(val,index,array){
    var row_date = new Date(Date.parse(val.date+"/"+date.getFullYear()));

    if(date <= row_date) {
      return row;
    }else {
      row = val;
      row['index'] = index;
    }
  });
  return row;
}


//ランダムで節気を取得
function getRandomSekki() {
  var index = Math.floor(Math.random() * sekkiJSON.length);
  var row = sekkiJSON[index];
  row['index'] = index;
  return row;
}


//指定した節気情報を画面にセット
function setSekki(sekki) {
  $("title").text(sekki.kou);
  $("#kou").text(sekki.kou);
  $("#kou_kana").text(sekki.kou_kana);
  $("#sekki").text('【' + sekki.sekki + '】');
  $("#meaning").text(sekki.meaning);

  var month = sekki.date.split('/')[0];
  var day = sekki.date.split('/')[1];
  var kanjiDate = toKanjiNum(month) + '月' + toKanjiNum(day) + '日';
  $("#date").text(kanjiDate);

  //ツイートURLセット
  var tweetHref = "https://twitter.com/intent/tweet?url=https%3A%2F%2Ftabsekki.notsobad.jp%2Fsekki%2F{{index}}&text={{displayDate}}頃は%20%23{{sekkiSekki}}%20%23{{sekkiKou}}%20（{{sekkiKouKana}}）%0a%20{{sekkiMeaning}}"
  tweetHref = tweetHref.replace(/{{sekkiSekki}}/, sekki.sekki)
                       .replace(/{{sekkiKou}}/, sekki.kou)
                       .replace(/{{sekkiKouKana}}/, sekki.kou_kana)
                       .replace(/{{displayDate}}/, kanjiDate)
                       .replace(/{{sekkiMeaning}}/, sekki.meaning)
                       .replace(/{{index}}/, sekki.index)
  $("#tweet").attr("href", tweetHref);

  // 背景画像をランダムで設定
  var patterns = ['seigaiha', 'sayagata', 'asanoha'];
  var bg_img = patterns[Math.floor(Math.random()*patterns.length)];
  $("body").removeClass('seigaiha sayagata asanoha').addClass(bg_img);

  // 背景色を設定
  var hex = sekki.color_code.replace('#','');
  var r = parseInt(hex.substring(0,2), 16);
  var g = parseInt(hex.substring(2,4), 16);
  var b = parseInt(hex.substring(4,6), 16);
  var result = 'rgba('+r+','+g+','+b+',0.7)';
  $('head').append('<style>body:before { background-color: ' + result + '; } </style>');

  // 背景色の濃さに応じて文字色を設定
  if((r+g+b)>500) {
    $('#body').addClass('dark').removeClass('light');
  }else {
    $('#body').addClass('light').removeClass('dark');
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

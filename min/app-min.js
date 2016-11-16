function ElapsedTime(e,i,a,n){this.days=e,this.hours=i,this.minutes=a,this.seconds=n,this.toString=function(){return a+" m, "+n+" s"}}function Position(e){this.position=e,this.startTime=null,this.endTime=null}function Player(e,a){this.name=e,this.img=a,this.positions=[],this.addPosition=function(e){this.positions[this.positions.length]=e},this.endCurrentPosition=function(){this.positions.length>0&&(position=this.positions[this.positions.length-1],position.endTime=new Date)},this.getStatistic=function(){if(this.positions.length>0){var e="";for(i=0;i<this.positions.length;i++){var a=getElapsedTime(this.positions[i].startTime,this.positions[i].endTime);e+=this.positions[i].position+" -> time: "+a+"<br/>"}return e}return""},this.viewPositions=function(){if(this.positions.length>0){var e="[";for(i=0;i<this.positions.length;i++)e+=this.positions[i].position+",";return e=e.substring(0,e.length-1),e+="]"}return""},this.toString=function(){if(this.positions.length>0){position=this.positions[this.positions.length-1];var i=e;if(i+=" ["+position.position+"]",null!=position.startTime){var a=getElapsedTime(position.startTime,new Date);i+=' <div class="player-elapsed-time">'+a.toString()+"</div>"}return i}return e}}function init(){startTime=null,activePlayers=new Object,benchPlayers=new Object,currentPlayer=null,$("#players li").remove(),$("#positions li").remove(),$("#positions").hide(),$("#playeronbench").hide(),$("#gameover").hide(),$("#startgame").hide(),$("#init").hide(),$("#time").hide(),$("#lockscreen").hide(),$("#back").hide();for(var e in players){var i=e.charAt(0);$("#players").append('<li id="'+e+'" onClick="addPlayer(\''+e+'\')" class="player-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><div class="name-plate">'+i+'</div><img height="44" width="30" src="img/'+players[e]+'"> '+e+"</a></li>")}for(var a in positions)$("#positions .select-position-container").append('<li id="'+a+'" onClick="setPosition(\''+a+'\')" class="ui-btn"><span class="position-key">'+a+"</span> "+positions[a]+"</a></li>");listPlayers(),listPositions()}function popRemovePlayer(e){player=$("#"+e),setTimeout(function(){player.addClass("confirmed animated bounceOutRight"),player.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){player.remove()})},300)}function listPlayers(){for(var e in players){var i=e.charAt(0);console.log("setup players!"),$("#players-setup #list-players").append('<li id="'+e+'" class="player-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><div class="name-plate">'+i+'</div><img height="44" width="30" src="img/'+players[e]+'"> '+e+"</a></li>")}}function listPositions(){for(var e in positions)console.log("setup positions!"),$("#positions-setup #list-positions").append('<li id="'+e+'"class="position-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><span class="position-key">'+e+"</span></li>")}function addPlayer(e){currentPlayer=new Player(e,players[e]),$("#positions").show().find(".select-position-container").addClass("animate fadeInUp"),$("#teamcompletebutton").show()}function setPosition(e){"BENCH"!=e?($("#"+e).remove(),popRemovePlayer(currentPlayer.name),activePlayers[currentPlayer.name]=currentPlayer,activePlayers[currentPlayer.name].addPosition(new Position(e))):($("#playeronbench").append('<li id="b_'+currentPlayer.name+'" onClick="doSwitchPlayer(\''+currentPlayer.name+'\')" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><img height="44" width="30" src="img/'+currentPlayer.img+'"> '+currentPlayer.name+" "+currentPlayer.viewPositions()+"</a></li>"),benchPlayers[currentPlayer.name]=currentPlayer,popRemovePlayer(currentPlayer.name)),$("#players").show(),$("#positions").hide(),$("#teamcompletebutton").show()}function changePlayer(e){currentPlayer=activePlayers[e],$("#players").hide(),$("#playeronbench").show(),$("#gameover").hide(),$("#back").show()}function doSwitchPlayer(e){var i=benchPlayers[e],a=new Position(currentPlayer.positions[currentPlayer.positions.length-1].position);a.startTime=new Date,i.addPosition(a),$("#playeronbench").append('<li id="b_'+currentPlayer.name+'" onClick="doSwitchPlayer(\''+currentPlayer.name+'\')" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><img height="44" width="30" src="img/'+currentPlayer.img+'"> '+currentPlayer.name+" "+currentPlayer.viewPositions()+"</a></li>"),activePlayers[e]=i,currentPlayer.endCurrentPosition(),delete activePlayers[currentPlayer.name],delete benchPlayers[e],benchPlayers[currentPlayer.name]=currentPlayer,$("#b_"+e).remove(),$("#players").show(),$("#playeronbench").hide(),$("#gameover").show(),$("#back").hide()}function back(){$("#players").show(),$("#playeronbench").hide(),$("#gameover").show(),$("#back").hide()}function unlock(){$("#lockscreen").hide(),$("#gameover").show()}function lock(){$("#lockscreen").show(),$("#gameover").hide()}function teamComplete(){$("#players li").remove(),$("#teamcompletebutton").hide(),$("#startgame").show(),updateActiveView()}function startGame(){startTime=new Date,$("#time").show(),$("#startgame").hide();var e=new Date;for(var i in activePlayers)activePlayers[i].positions[activePlayers[i].positions.length-1].startTime=e;loopId=setInterval(updateActiveView,1e3),$("#gameover").show(),lock()}function updateActiveView(){$("#players li").remove();for(var e in activePlayers)console.log(activePlayers[e].positions[0].position),$("#players").append('<li id="'+activePlayers[e].name+'" onClick="changePlayer(\''+activePlayers[e].name+'\')" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><img height="44" width="30" src="img/'+players[e]+'"> <span class="position-key">'+activePlayers[e].positions[0].position+"</span>"+activePlayers[e].name+"</a></li>");null!=startTime&&(eTime=getElapsedTime(startTime,new Date),eMinutes=eTime.minutes,eSeconds=eTime.seconds,eSeconds=eSeconds<10?"0"+eSeconds:eSeconds,eMinutes=eMinutes<10?"0"+eMinutes:eMinutes,$("#time").html('<div class="elapsed_time"><div id="elapsed_seconds">'+eMinutes+'</div> <div class="divider">:</div> <div id="elapsed_minutes">'+eSeconds+"</div> </div>"))}function gameOver(){$("#gameover").hide(),clearInterval(loopId),$("#players li").remove();for(var e in activePlayers){var i=activePlayers[e];i.endCurrentPosition(),$("#players").append('<li id="'+i.name+'" onClick="" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right"><b><u>'+i.name+"</u></b><br/> "+i.getStatistic()+"</a></li>")}for(var e in benchPlayers){var i=benchPlayers[e];$("#players").append('<li id="'+i.name+'" onClick="" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right"><b><u>'+i.name+"</u></b><br/> "+i.getStatistic()+"</a></li>")}$("#init").show()}function getElapsedTime(e,i){var a=i-e;a/=1e3;var n=Math.round(a%60);a=Math.floor(a/60);var t=Math.round(a%60);a=Math.floor(a/60);var s=Math.round(a%24);a=Math.floor(a/24);var r=a;return new ElapsedTime(r,s,t,n)}var playersObj={players:[{player_name:"Adrian",player_image:"IMG_0172.jpg"},{player_name:"Albin",player_image:"IMG_0176.jpg"},{player_name:"Christoffer",player_image:"IMG_0178.jpg"},{player_name:"Dante",player_image:"IMG_0174.jpg"},{player_name:"Dylan",player_image:"IMG_0175.jpg"},{player_name:"Emil",player_image:"IMG_0166.jpg"},{player_name:"Ivar",player_image:"IMG_0169.jpg"},{player_name:"Jacob",player_image:"IMG_0167.jpg"},{player_name:"Leo",player_image:"IMG_0173.jpg"},{player_name:"Linus",player_image:"IMG_0166.jpg"},{player_name:"Malte",player_image:"IMG_0177.jpg"},{player_name:"Pontus",player_image:"IMG_0168.jpg"},{player_name:"Samuel",player_image:"IMG_0171.jpg"},{player_name:"Sebastian",player_image:"IMG_0166.jpg"},{player_name:"Tor",player_image:"IMG_0170.jpg"},{player_name:"Viggo",player_image:"IMG_0179.jpg"},{player_name:"Viktor",player_image:"IMG_0180.jpg"},{player_name:"Åke",player_image:"IMG_0166.jpg"}]},players=new Object;players.Adrian="IMG_0172.jpg",players.Albin="IMG_0176.jpg",players.Christoffer="IMG_0178.jpg",players.Dante="IMG_0174.jpg",players.Dylan="IMG_0175.jpg",players.Emil="IMG_0166.jpg",players.Ivar="IMG_0169.jpg",players.Jacob="IMG_0167.jpg",players.Leo="IMG_0173.jpg",players.Linus="IMG_0166.jpg",players.Malte="IMG_0177.jpg",players.Pontus="IMG_0168.jpg",players.Samuel="IMG_0171.jpg",players.Sebastian="IMG_0166.jpg",players.Tor="IMG_0170.jpg",players.Viggo="IMG_0179.jpg",players.Viktor="IMG_0180.jpg",players["Åke"]="IMG_0166.jpg";var positions=new Object;positions.F="Forward",positions.VM="Vänster Mittfältare",positions.HM="Höger Mittfältare",positions.B="Back",positions.BENCH="Avbytarbänk";var activePlayers=new Object,benchPlayers=new Object,currentPlayer=null,loopId,startTime;$.fn.extend({animateCss:function(e){var i="webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";this.addClass("animated "+e).one(i,function(){$(this).removeClass("animated "+e)})}}),$(document).ready(function($){FastClick.attach(document.body),$("#positions .cancel").on("click",function(){$("#positions").hide()}),$("#lock-screen").on("click",function(){lock(),$(this).toggleClass("active")}),$(document).on("pagebeforeshow","#players-setup",function(){}),$(document).on("pagebeforeshow","#positions-setup",function(){})}),$(document).on("pageinit","#splash",function(){setTimeout(function(){$(":mobile-pagecontainer").pagecontainer("change","#start",{role:"page"})},4e3)});
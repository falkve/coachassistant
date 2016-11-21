function initLocalStorage(){var e=localStorage.getItem("players");if(null===e){var e=new Object,e={players:[]},i=JSON.stringify(e);localStorage.setItem("players",i),console.log("Nothing in LS, create and setup players object: ",e)}}function getData(){initLocalStorage();var e=localStorage.getItem("players"),e=JSON.parse(e);return e}function saveData(e){console.log("Save data to LS: ",e);var i=JSON.stringify(e);localStorage.setItem("players",i),console.log(localStorage.getItem("players"))}function ElapsedTime(e,i,t,a){this.days=e,this.hours=i,this.minutes=t,this.seconds=a,this.toString=function(){return t+" m, "+a+" s"}}function Position(e){this.position=e,this.startTime=null,this.endTime=null}function Player(e,t){this.name=e,this.img=t,this.positions=[],this.addPosition=function(e){this.positions[this.positions.length]=e},this.endCurrentPosition=function(){this.positions.length>0&&(position=this.positions[this.positions.length-1],position.endTime=new Date)},this.getStatistic=function(){if(this.positions.length>0){var e="";for(i=0;i<this.positions.length;i++){var t=getElapsedTime(this.positions[i].startTime,this.positions[i].endTime);e+=this.positions[i].position+" -> time: "+t+"<br/>"}return e}return""},this.viewPositions=function(){if(this.positions.length>0){var e="[";for(i=0;i<this.positions.length;i++)e+=this.positions[i].position+",";return e=e.substring(0,e.length-1),e+="]"}return""},this.toString=function(){if(this.positions.length>0){position=this.positions[this.positions.length-1];var i=e;if(i+=position.position,null!=position.startTime){var t=getElapsedTime(position.startTime,new Date);i+=' <div class="player-elapsed-time">'+t.toString()+"</div>"}return i}return e}}function trim(e){return e.replace(/^\s+|\s+$/g,"")}function isEmpty(e){for(var i in e)if(e.hasOwnProperty(i))return!1;return!0}function init(){if(startTime=null,activePlayers=new Object,benchPlayers=new Object,currentPlayer=null,$("#players-container #players li").remove(),$("#positions li").remove(),$("#positions").hide(),$("#playeronbench-container").hide(),$("#gameover").hide(),$("#startgame").hide(),$("#init").hide(),$("#time-container").hide(),$("#lockscreen").hide(),$("#back").hide(),isEmpty(playersObj.players))$("#start #players-container #players").append('<li>Du har inte skapat ditt lag ännu. <a class="players-setup" style="border: 1px solid black; background: black !important; border-radius: 20px !important; margin-top: 15px;" href="#players-setup" data-transition="none"><span class="btn-label">Lägg till din första spelare</span></a></li>');else for(var e=0;e<playersObj.players.length;e++)thisPlayer=playersObj.players[e],1==settings.shirt_numbers?player_name_plate=thisPlayer.player_number:player_name_plate=thisPlayer.player_name.charAt(0),$("#start #players-container #players").append('<li id="'+thisPlayer.player_name+'" onClick="addPlayer(\''+thisPlayer.player_name+'\')" class="player-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><div class="name-plate">'+player_name_plate+'</div><img height="44" width="30" src="img/'+thisPlayer.player_image+'"> <span class="player-name">'+thisPlayer.player_name+"</span></a></li>");for(var i in positions)$("#positionSelector .select-position-container").append('<li id="'+i+'" onClick="setPosition(\''+i+'\')" class="ui-btn"><span class="position-key">'+i+"</span> "+positions[i]+"</a></li>"),$("#positions .select-position-container").append('<li id="'+i+'" onClick="setPosition(\''+i+'\')" class="ui-btn"><span class="position-key">'+i+"</span> "+positions[i]+"</a></li>");listPlayers(),listPositions()}function popRemovePlayer(e){player=$("#"+e),setTimeout(function(){player.addClass("confirmed animated bounceOutRight"),player.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){player.remove()})},300)}function listPlayers(){if(isEmpty(playersObj))$("#all-players").html('<ul data-role="listview" data-inset="true" id="list-players" class="list-unstyled"><li>Inga spelare hittades</li></ul>');else if(playersObj.players.length>0){$("#all-players").html('<ul data-role="listview" data-inset="true" id="list-players" class="list-unstyled"></ul>');for(var e=0;e<playersObj.players.length;e++){thisPlayer=playersObj.players[e];var i=thisPlayer.player_name.charAt(0);$("#players-setup #list-players").append('<li id="'+thisPlayer.player_name+'" class="player-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><div class="name-plate">'+i+'</div><div class="number-plate">'+thisPlayer.player_number+'</div><img height="44" width="30" src="img/'+thisPlayer.player_image+'"> <div class="player-name">'+thisPlayer.player_name+"</div></a></li>")}}else $("#players-setup #list-players").append("<li>Lägg till spelare</li>")}function listPositions(){for(var e in positions)$("#positions-setup #list-positions").append('<li id="'+e+'"class="position-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><span class="position-key">'+e+"</span></li>")}function createPlayer(){var e=document.getElementById("player_name"),i=document.getElementById("player_number"),t=trim(e.value),a=trim(i.value),n="The following fields had errors in them: \n\n",s="You entered the following information: \n\n",r=!1;""==t?(n+="Name: Please enter your name\n",r=!0):s+="Name: "+t+"\n",r?console.log(n):addPlayerTolist(player_name.value,player_number.value)}function addPlayerTolist(e,i){var t=playersObj;console.log(playersObj);var a={player_name:e,player_image:"na.png",player_number:i};$("#all-players").append(""),t.players.push(a),saveData(t),listPlayers()}function initSettings(){useLockableKeyboard=settings.lockable_keyboard,useLogGames=settings.log_games,useShirtNumbers=settings.shirt_numbers,useSaveLocation=settings.save_location,userEmail=settings.user_email,useLockableKeyboard&&$("#lockable-startpage").prop("checked",!0),useShirtNumbers&&$("#use-playershirtnum").prop("checked",!0),useLogGames&&$("#log-games").prop("checked",!0),useSaveLocation&&$("#log-games").prop("checked",!0),userEmail&&$("#gps-trackning").prop("checked",!0)}function addPlayer(e){currentPlayer=new Player(e,players[e]),$("#positionSelector").popup("open",{transition:"flow",overlayTheme:"a"}),$("#teamcompletebutton").show()}function countActivePlayers(){var e=0,i=0,t;for(t in activePlayers)activePlayers.hasOwnProperty(t)&&e++;for(t in benchPlayers)benchPlayers.hasOwnProperty(t)&&i++;totalTeam=e+i,$("#players-container #active-players-badge").text(e),$("#players-container #benched-players-badge").text(i),$("#players-container #total-players-badge").text(totalTeam),totalTeam>0&&totalTeam<2?($("#current-team").addClass("animated tada active"),$("#current-team").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){$("#current-team").removeClass("animated tada")})):($("#current-team").addClass("animated tada"),$("#current-team").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){$("#current-team").removeClass("animated tada")}))}function setPosition(e){"BENCH"!=e?($("#"+e).remove(),$("#positionSelector").find("#"+e).remove(),popRemovePlayer(currentPlayer.name),activePlayers[currentPlayer.name]=currentPlayer,activePlayers[currentPlayer.name].addPosition(new Position(e))):($("#playeronbench-container #playeronbench").append('<li id="b_'+currentPlayer.name+'" onClick="doSwitchPlayer(\''+currentPlayer.name+'\')" class="player-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><img height="44" width="30" src="img/'+currentPlayer.img+'"> '+currentPlayer.name+" "+currentPlayer.viewPositions()+"</a></li>"),benchPlayers[currentPlayer.name]=currentPlayer,popRemovePlayer(currentPlayer.name)),$("#players-container").show(),$("#positions").hide(),$("#positionSelector").popup("close"),$("#teamcompletebutton").show(),countActivePlayers()}function changePlayer(e){currentPlayer=activePlayers[e],$("#players-container").hide(),$("#playeronbench-container #current-player .name").text(currentPlayer.name),$("#playeronbench-container").show(),$("#gameover").hide(),$("#back").show()}function doSwitchPlayer(e){var i=benchPlayers[e],t=new Position(currentPlayer.positions[currentPlayer.positions.length-1].position);t.startTime=new Date,i.addPosition(t),$("#playeronbench-container #playeronbench").append('<li id="b_'+currentPlayer.name+'" onClick="doSwitchPlayer(\''+currentPlayer.name+'\')" class="player-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><img height="44" width="30" src="img/'+currentPlayer.img+'"> '+currentPlayer.name+" "+currentPlayer.viewPositions()+"</a></li>"),activePlayers[e]=i,currentPlayer.endCurrentPosition(),delete activePlayers[currentPlayer.name],delete benchPlayers[e],benchPlayers[currentPlayer.name]=currentPlayer,$("#b_"+e).remove(),$("#players-container").show(),$("#playeronbench-container").hide(),$("#gameover").show(),$("#back").hide()}function back(){$("#players-container").show(),$("#playeronbench-container").hide(),$("#gameover").show(),$("#back").hide()}function unlock(){$("#lockscreen").hide(),$("#gameover").show()}function lock(){$("#lockscreen").show(),$("#gameover").hide()}function teamComplete(){$("#players li").remove(),$("#teamcompletebutton").hide(),$("#startgame").show(),updateActiveView()}function startGame(){startTime=new Date,$("#start .ui-content").addClass("timer-active"),$("#time-container").show(),$("#startgame").hide(),$("#current-team").hide();var e=new Date;for(var i in activePlayers)activePlayers[i].positions[activePlayers[i].positions.length-1].startTime=e;loopId=setInterval(updateActiveView,1e3),$("#gameover").show(),lock()}function updateActiveView(){$("#players-container #players li").remove();for(var e in activePlayers)$("#players-container #players").append('<li id="'+activePlayers[e].name+'" onClick="changePlayer(\''+activePlayers[e].name+'\')" class="player-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><img height="44" width="30" src="img/'+players[e]+'"> <span class="position-key">'+activePlayers[e].positions[0].position+"</span>"+activePlayers[e].toString()+"</a></li>");null!=startTime&&(eTime=getElapsedTime(startTime,new Date),eMinutes=eTime.minutes,eSeconds=eTime.seconds,eSeconds=eSeconds<10?"0"+eSeconds:eSeconds,eMinutes=eMinutes<10?"0"+eMinutes:eMinutes,$("#time-container #time").html('<div class="elapsed_time"><div id="elapsed_seconds">'+eMinutes+'</div> <div class="divider">:</div> <div id="elapsed_minutes">'+eSeconds+"</div> </div>"))}function gameOver(){$("#gameover").hide(),clearInterval(loopId),$("#players-container #players li").remove();for(var e in activePlayers){var i=activePlayers[e];i.endCurrentPosition(),$("#players-container #players").append('<li id="'+i.name+'" onClick="" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right"><b><u>'+i.name+"</u></b><br/> "+i.getStatistic()+"</a></li>")}for(var e in benchPlayers){var i=benchPlayers[e];$("#players-container #players").append('<li id="'+i.name+'" onClick="" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right"><b><u>'+i.name+"</u></b><br/> "+i.getStatistic()+"</a></li>")}$("#init").show()}function getElapsedTime(e,i){var t=i-e;t/=1e3;var a=Math.round(t%60);t=Math.floor(t/60);var n=Math.round(t%60);t=Math.floor(t/60);var s=Math.round(t%24);t=Math.floor(t/24);var r=t;return new ElapsedTime(r,s,n,a)}var playersObj=getData(),players=new Object;players.Adrian="IMG_0172.jpg",players.Albin="IMG_0176.jpg",players.Christoffer="IMG_0178.jpg",players.Dante="IMG_0174.jpg",players.Dylan="IMG_0175.jpg",players.Emil="IMG_0166.jpg",players.Ivar="IMG_0169.jpg",players.Jacob="IMG_0167.jpg",players.Leo="IMG_0173.jpg",players.Linus="IMG_0166.jpg",players.Malte="IMG_0177.jpg",players.Pontus="IMG_0168.jpg",players.Samuel="IMG_0171.jpg",players.Sebastian="IMG_0166.jpg",players.Tor="IMG_0170.jpg",players.Viggo="IMG_0179.jpg",players.Viktor="IMG_0180.jpg",players["Åke"]="IMG_0166.jpg";var positions=new Object;positions.F="Forward",positions.VM="Vänster Mittfältare",positions.HM="Höger Mittfältare",positions.B="Back",positions.BENCH="Avbytarbänk";var settings=new Object;settings.lockable_keyboard=0,settings.shirt_numbers=0,settings.log_games=0,settings.save_location=0,settings.user_email="martin@kidkie.se";var activePlayers=new Object,benchPlayers=new Object,currentPlayer=null,loopId,startTime;$.fn.extend({animateCss:function(e){var i="webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";this.addClass("animated "+e).one(i,function(){$(this).removeClass("animated "+e)})}}),$(document).ready(function($){FastClick.attach(document.body),$("#positions .cancel").on("click",function(){$("#positions").hide()}),$("#lock-screen").on("click",function(){lock(),$(this).toggleClass("active")}),$(document).on("pagebeforeshow","#players-setup",function(){}),$(document).on("pagebeforeshow","#positions-setup",function(){}),initSettings(),$("#settings-form").change(function(){console.log("Settings changed!"),$("#settings-form input[type=checkbox]").each(function(){var e=this.checked?"1":"0";settingOption=$(this).attr("id"),settings[settingOption]=e}),console.log(settings)}),$("#createPlayerForm button").on("click",function(e){$("#popupCreatePlayer").popup("close"),e.preventDefault(),console.log("save"),createPlayer()})}),$(document).on("pageinit","#splash",function(){setTimeout(function(){$(":mobile-pagecontainer").pagecontainer("change","#start",{role:"page"})},4e3)});
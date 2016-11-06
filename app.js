/**
 * Created by vonfalk on 2016-04-13.
 */

var players = new Object();
players['Adrian'] = 'IMG_0172.jpg';
players['Albin'] = 'IMG_0176.jpg';
players['Christoffer'] = 'IMG_0178.jpg';
players['Dante'] = 'IMG_0174.jpg';
players['Dylan'] = 'IMG_0175.jpg';
players['Emil'] = 'IMG_0166.jpg';
players['Ivar'] = 'IMG_0169.jpg';
players['Jacob'] = 'IMG_0167.jpg';
players['Leo'] = 'IMG_0173.jpg';
players['Linus'] = 'IMG_0166.jpg';
players['Malte'] = 'IMG_0177.jpg';
players['Pontus'] = 'IMG_0168.jpg';
players['Samuel'] = 'IMG_0171.jpg';
players['Sebastian'] = 'IMG_0166.jpg';
players['Tor'] = 'IMG_0170.jpg';
players['Viggo'] = 'IMG_0179.jpg';
players['Viktor'] = 'IMG_0180.jpg';
players['Åke'] = 'IMG_0166.jpg';

var positions = new Object();
/*positions['HF'] = 'Höger Forward';
positions['VF'] = 'Vänster Forward';
positions['M'] = 'Mittfältare';
positions['HB'] = 'Höger Back';
positions['VB'] = 'Vänster Back';
positions['BENCH'] = 'Avbytarbänk';*/


positions['F'] = 'Forward';
positions['VM'] = 'Vänster Mittfältare';
positions['HM'] = 'Höger Mittfältare';
positions['B'] = 'Back';
positions['BENCH'] = 'Avbytarbänk';

var activePlayers = new Object();
var benchPlayers = new Object();
var currentPlayer = null;
var loopId;
var startTime;

function ElapsedTime(days, hours, minutes, seconds){
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;

    this.toString = function (){
        return minutes + ' m, ' + seconds + ' s';
    }
}

function Position(position){
    this.position = position;
    this.startTime = null;
    this.endTime = null;
}

function Player (name, img) {
    this.name = name;
    this.img = img;
    this.positions = [];

    this.addPosition = function(position) {
        this.positions[this.positions.length] = position;
    };

    this.endCurrentPosition = function(){
        if(this.positions.length > 0){
            position = this.positions[this.positions.length-1];
            position.endTime = new Date();
        }
    };

    this.getStatistic = function(){
        if(this.positions.length > 0){
            var stat = '';
            for(i = 0; i < this.positions.length; i++){
                var elapsedTime = getElapsedTime(this.positions[i].startTime, this.positions[i].endTime);
                stat += this.positions[i].position + " -> time: " + elapsedTime + "<br/>";
            }
            return stat;
        } else {
            return '';
        }
    };

    this.viewPositions = function(){
        if(this.positions.length > 0) {
            var positions = "["
            for (i = 0; i < this.positions.length; i++) {
                positions += this.positions[i].position + ',';
            }
            positions = positions.substring(0, positions.length - 1);
            positions += "]";
            return positions;
        } else return "";

    }

    this.toString = function(){
        if(this.positions.length > 0){
            position = this.positions[this.positions.length-1];
            var returnString = name;

            returnString += ' [' + position.position + ']';

            if(position.startTime != null){
                var elapsedTime = getElapsedTime(position.startTime, new Date());
                returnString += ' - ' + elapsedTime.toString();
            }
            return returnString;

        } else {
            return name;
        }
    };
}

function init() {
    startTime = null;
    activePlayers = new Object();
    benchPlayers = new Object();
    currentPlayer = null;
    $('#players li').remove();
    $('#positions li').remove();
    $("#positions").hide();
    $("#playeronbench").hide();
    $("#gameover").hide();
    $("#startgame").hide();
    $("#init").hide();
    $("#time").hide();
    $("#lockscreen").hide();
    $("#back").hide();
    
    for (var name in players) {
	    var name_plate = name.charAt(0);
	    
        $("#players").append('<li id="' + name + '" onClick="addPlayer(\'' + name + '\')" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><div class="name-plate">'+name_plate+'</div><img height="44" width="30" src="img/' + players[name] + '"> ' + name + '</a></li>');
    }

    for (var key in positions) {
        $("#positions .select-position-container").append('<li id="'+key+'" onClick="setPosition(\''+key+'\')" class="ui-btn">'+key+ ' - '+positions[key]+'</a></li>');
    }

}

function addPlayer(name){
    $('#'+name).remove();
    currentPlayer = new Player(name, players[name]);
    //$("#players").hide();
    $("#positions").show();
    $('#teamcompletebutton').hide();
}

function setPosition(position){
    if(position != 'BENCH'){
        $('#'+position).remove();
        activePlayers[currentPlayer.name] = currentPlayer;
        activePlayers[currentPlayer.name].addPosition(new Position(position));
    } else {
        $("#playeronbench").append('<li id="b_'+currentPlayer.name+'" onClick="doSwitchPlayer(\''+currentPlayer.name+'\')" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><img height="44" width="30" src="img/'+currentPlayer.img+'"> '+currentPlayer.name+ ' '  + currentPlayer.viewPositions() + '</a></li>');
        benchPlayers[currentPlayer.name] = currentPlayer;
    }
    $("#players").show();
    $("#positions").hide();
    $('#teamcompletebutton').show();
}

function changePlayer(name){
    currentPlayer = activePlayers[name];
    $("#players").hide();
    $("#playeronbench").show();
    $("#gameover").hide();
    $("#back").show();
}

function doSwitchPlayer(name){
    var p = benchPlayers[name];
    var position = new Position(currentPlayer.positions[currentPlayer.positions.length-1].position);
    position.startTime = new Date();
    p.addPosition(position);
    $("#playeronbench").append('<li id="b_'+currentPlayer.name+'" onClick="doSwitchPlayer(\''+currentPlayer.name+'\')" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><img height="44" width="30" src="img/'+currentPlayer.img+'"> '+currentPlayer.name+ ' ' +currentPlayer.viewPositions()+'</a></li>');

    activePlayers[name] = p;
    currentPlayer.endCurrentPosition();
    delete activePlayers[currentPlayer.name];
    delete benchPlayers[name];
    benchPlayers[currentPlayer.name] = currentPlayer;
    $('#b_'+name).remove();

    $("#players").show();
    $("#playeronbench").hide();
    $("#gameover").show();
    $("#back").hide();

}
function back(){
    $("#players").show();
    $("#playeronbench").hide();
    $("#gameover").show();
    $("#back").hide();
}

function unlock(){
    $("#lockscreen").hide();
    $("#gameover").show();
}

function lock(){
    $("#lockscreen").show();
    $("#gameover").hide();
}

function teamComplete(){
    $('#players li').remove();
    $('#teamcompletebutton').hide();
    $("#startgame").show();
    updateActiveView();
}

function startGame(){
    startTime = new Date();
    $("#time").show();
    $("#startgame").hide();
    var d = new Date();
    for (var name in activePlayers) {
        activePlayers[name].positions[activePlayers[name].positions.length-1].startTime = d;
    }
    loopId = setInterval(updateActiveView, 1000);
    $("#gameover").show();
    lock();
}

function updateActiveView(){
    $('#players li').remove();
    for (var name in activePlayers) {
        $("#players").append('<li id="'+activePlayers[name].name+'" onClick="changePlayer(\''+activePlayers[name].name+'\')" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><img height="44" width="30" src="img/'+players[name]+'"> '+activePlayers[name].toString()+ '</a></li>');
    }
    if(startTime != null){
        $('#time').text(getElapsedTime(startTime, new Date()));
    }
}

function gameOver(){
    $("#gameover").hide();
    clearInterval(loopId);
    $('#players li').remove();
    for (var name in activePlayers) {
        var player = activePlayers[name];
        player.endCurrentPosition();

        $("#players").append('<li id="'+player.name+'" onClick="" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right"><b><u>'+player.name+'</u></b><br/> '+player.getStatistic()+ '</a></li>');
    }
    for (var name in benchPlayers) {
        var player = benchPlayers[name];
        $("#players").append('<li id="'+player.name+'" onClick="" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right"><b><u>'+player.name+'</u></b><br/> '+player.getStatistic()+ '</a></li>');
    }
    $("#init").show();
}



function getElapsedTime(from, to){

    var timeDiff = to - from;

    // strip the ms
    timeDiff /= 1000;

    // get seconds (Original had 'round' which incorrectly counts 0:28, 0:29, 1:30 ... 1:59, 1:0)
    var seconds = Math.round(timeDiff % 60);

    // remove seconds from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get minutes
    var minutes = Math.round(timeDiff % 60);

    // remove minutes from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get hours
    var hours = Math.round(timeDiff % 24);

    // remove hours from the date
    timeDiff = Math.floor(timeDiff / 24);

    // the rest of timeDiff is number of days
    var days = timeDiff ;

    return new ElapsedTime(days, hours, minutes, seconds);
}

// Cancel position selector
$( document ).ready(function($) {
	
	$('#positions .cancel').on('click', function() {
		console.log('test');
		$('#positions').hide();
	});
	
	// Lock button
	
	$('#lock-screen').on('click', function() {
		lock();
		console.log('test');
		$(this).toggleClass('active');
	});

});
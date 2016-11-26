/**
 * Created by vonfalk on 2016-04-13.
 */

// Setup	
function initLocalStorage() {
	var playersObj = localStorage.getItem("players");
	
	if( playersObj === null ) {
		// Create obj
		var playersObj = new Object();

		// test data
		// var playersObj = {"players":[{"player_name":"test", "player_image":"na.png", "player_number":"10"}]};
		var playersObj = {"players":[]};
		
		// Data must be stringified to be able to store it
		var dataToStore = JSON.stringify(playersObj);
		
		// Create it and add test data
		localStorage.setItem('players', dataToStore);
		
		// Confirm
		console.log('Nothing in LS, create and setup players object: ',playersObj);
	} else {
		//console.log('Obj exists, get data: ',playersObj);
	}		
}

// Get data from localStorage
function getData() {
	// Check if OBJ exists, if not, create it
	initLocalStorage();
	
	// Get LS
	var playersObj = localStorage.getItem("players");
	
	// Make it a JSON object again
	var playersObj = JSON.parse(playersObj);
	
	// Confirm
	//console.log('Get data from local storage: ', playersObj);
	
	// Retrieve and return it globally
	return playersObj;
}

// Save data to localStorage
function saveData(data) {
	
	// Confirm
	console.log("Save data to LS: ", data);
	
	// To save data to local storage you need to 
	// stringify it
	var dataToStore = JSON.stringify(data);
	
	// Add it to LS
	localStorage.setItem('players', dataToStore);
	
	// Confirm and preview data after save
	console.log( localStorage.getItem("players") );
}

// Get data and make it global
var playersObj = getData();

// Confirm
//console.log('this is returned from LS: ', playersObj);

/*
// Make it work with create player and localStorage instead
var playersObj = new Object();
var playersObj = {"players":[
	{'player_name':'Adrian','player_image':'IMG_0172.jpg','player_number':''},
	{'player_name':'Albin', 'player_image':'IMG_0176.jpg','player_number':''},
	{'player_name':'Christoffer', 'player_image':'IMG_0178.jpg','player_number':''},
	{'player_name':'Dante', 'player_image':'IMG_0174.jpg','player_number':''},
	{'player_name':'Dylan', 'player_image':'IMG_0175.jpg','player_number':''},
	{'player_name':'Emil', 'player_image':'IMG_0166.jpg','player_number':''},
	{'player_name':'Ivar', 'player_image':'IMG_0169.jpg','player_number':''},
	{'player_name':'Jacob', 'player_image':'IMG_0167.jpg','player_number':''},
	{'player_name':'Leo', 'player_image':'IMG_0173.jpg','player_number':''},
	{'player_name':'Linus','player_image':'IMG_0166.jpg','player_number':''},
	{'player_name':'Malte', 'player_image':'IMG_0177.jpg','player_number':''},
	{'player_name':'Pontus', 'player_image':'IMG_0168.jpg','player_number':''},
	{'player_name':'Samuel', 'player_image':'IMG_0171.jpg','player_number':''},
	{'player_name':'Sebastian', 'player_image':'IMG_0166.jpg','player_number':''},
	{'player_name':'Tor', 'player_image':'IMG_0170.jpg','player_number':''},
	{'player_name':'Viggo','player_image':'IMG_0179.jpg','player_number':''},
	{'player_name':'Viktor', 'player_image':'IMG_0180.jpg','player_number':''},
	{'player_name':'Åke', 'player_image':'IMG_0166.jpg','player_number':''}
]};
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


// Positions
// Todo, copy playerObj functions...
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


// Settings default is false on everything
var settings = new Object();
settings['lockable_keyboard'] = 0;
settings['shirt_numbers'] = 0;
settings['log_games'] = 0;
settings['save_location'] = 0;
settings['user_email'] = 'martin@kidkie.se';

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
	    //console.log(position);
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

            //returnString += ' [' + position.position + ']';
            returnString += position.position;

            if(position.startTime != null){
                var elapsedTime = getElapsedTime(position.startTime, new Date());
                returnString += ' <div class="player-elapsed-time">' + elapsedTime.toString() + '</div>';
            }
            return returnString;

        } else {
            return name;
        }
    };
}

function trim (str) {
     return str.replace (/^\s+|\s+$/g, '');
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

function init() {
    startTime = null;
    activePlayers = new Object();
    benchPlayers = new Object();
    currentPlayer = null;
    
    $('#players-container #players li').remove();
    $('#positions li').remove();
    $("#positions").hide();
    $("#playeronbench-container").hide();
    $("#gameover").hide();
    $("#startgame").hide();
    $("#init").hide();
    $("#time-container").hide();
    $("#lockscreen").hide();
    $("#back").hide();
    
    if( isEmpty(playersObj.players) ) {
	    $("#start #players-container #players").append('<li>Du har inte skapat ditt lag ännu. <a class="players-setup" style="border: 1px solid black; background: black !important; border-radius: 20px !important; margin-top: 15px;" href="#players-setup" data-transition="none"><span class="btn-label">Lägg till din första spelare</span></a></li>');
	} else {
	    for (var i=0; i<playersObj.players.length; i++) {
			thisPlayer = playersObj.players[i];
			
			if(settings['shirt_numbers']==1) {
				player_name_plate = thisPlayer.player_number;
			} else {
				player_name_plate = thisPlayer.player_name.charAt(0);
			}
			
			$("#start #players-container #players").append('<li id="' + thisPlayer.player_name + '" onClick="addPlayer(\'' + thisPlayer.player_name + '\')" class="player-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><div class="name-plate">'+player_name_plate+'</div><img height="44" width="30" src="img/' + thisPlayer.player_image + '"> <span class="player-name">' + thisPlayer.player_name + '</span></a></li>');
		}
	}
    
    /*
    for (player in playersObj.players) {
	    console.log(playersObj);
	    var name_plate = player.player_name.charAt(0);
        $("#players-container #players").append('<li id="' + player.player_name + '" onClick="addPlayer(\'' + player.player_name + '\')" class="player-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><div class="name-plate">'+name_plate+'</div><img height="44" width="30" src="img/' + player.player_name + '"> ' + player.player_name + '</a></li>');
    }
    */

    for (var key in positions) {
	    // 
	    $("#positionSelector .select-position-container").append('<li id="'+key+'" onClick="setPosition(\''+key+'\')" class="ui-btn"><span class="position-key">'+key+ '</span> '+positions[key]+'</a></li>');
	    
        $("#positions .select-position-container").append('<li id="'+key+'" onClick="setPosition(\''+key+'\')" class="ui-btn"><span class="position-key">'+key+ '</span> '+positions[key]+'</a></li>');
    }
    
	// List players
	listPlayers();
	
	// List positions
	listPositions();
}

// Animations
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

function popRemovePlayer(name) {
	// Add class to animate	
	player = $('#'+name);
	
	setTimeout(function(){
		player.addClass('confirmed animated bounceOutRight');
		player.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			// do when Animation ends!;
			player.remove();
		});
	}, 300);
}

// -------------------------------------------
// App Functionality
// -------------------------------------------

// List and handle players
function listPlayers() {
	//console.log('list players', playersObj);
	
	if( isEmpty(playersObj) ) {
		$('#all-players').html('<ul data-role="listview" data-inset="true" id="list-players" class="list-unstyled"><li>Inga spelare hittades</li></ul>');
	} else {
		//console.log('obj exists list players!');

		if(playersObj.players.length > 0) {
			$('#all-players').html('<ul data-role="listview" data-inset="true" id="list-players" class="list-unstyled"></ul>');
			for (var i=0; i<playersObj.players.length; i++) {
				//console.log(playersObj.players);
				
				thisPlayer = playersObj.players[i];
				var name_plate = thisPlayer.player_name.charAt(0);
				$("#players-setup #list-players").append('<li id="' + thisPlayer.player_name + '" class="player-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><div class="name-plate">'+name_plate+'</div><div class="number-plate">'+thisPlayer.player_number+'</div><img height="44" width="30" src="img/' + thisPlayer.player_image + '"> <div class="player-name">' + thisPlayer.player_name + '</div></a></li>');
			}
		} else {
			$("#players-setup #list-players").append('<li>Lägg till spelare</li>');
		}
	}
}

// List and handle positions
function listPositions() {
    for (var position in positions) {
        $("#positions-setup #list-positions").append('<li id="' + position + '"class="position-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><span class="position-key">'+position+'</span></li>');
    }   
}

// todo check form
/*
	if (trim(name_element.value) == '') {
		alert ('Please enter your name');
	}
*/

// Create players
function createPlayer() {
	
  var name_element = document.getElementById('player_name');
  var number_element = document.getElementById('player_number');
  //var email_element = document.getElementById('player_numberl');
  //var mail_format_element = document.getElementById('slt_mail_format');
  
  // ToDo
  // Kolla om numret finns redan...?

  var name = trim(name_element.value);
  var number = trim(number_element.value);
  
  //var email = trim(email_element.value);
  //var mail_format = mail_format_element.value;

  var error_message = 'The following fields had errors in them: \n\n';
  var data = 'You entered the following information: \n\n';

  var error_flag = false;

  if(name == '') {
	  error_message += 'Name: Please enter your name\n';
	  error_flag = true;
  } else {
	  data += 'Name: ' + name + '\n';
  }
  
  /*
  if(!checkEmail(email)) {
	  error_message += 'Email: Please enter a valid email address';
	  error_flag = true;
  } else {
	  data += 'Email: ' + email + '\n';
  }

  data += 'Mail Format: ' + mail_format;
  */
  
  if(error_flag) {
	  console.log(error_message);
  } else {
	  addPlayerTolist(player_name.value,player_number.value);
  }

}

// Add player to list
function addPlayerTolist(player_name,player_number) {
	//console.log(player_name, player_number);
	//console.log('trying to save player to obj: ',obj);
	
	var obj = playersObj;
	console.log(playersObj);
	
	var createPlayer = { "player_name" : player_name, "player_image" : "na.png" , "player_number" : player_number };
	
	$('#all-players').append('');
	
	//jsonStr = JSON.stringify(obj);
	//console.log(jsonStr);
	//console.log(typeof obj);
	
	// Add it to the plauers object
	obj.players.push(createPlayer);
	
	// Save it to LocalStorage
	saveData( obj );
	
	listPlayers();
	
}

// Settings
function initSettings() {
	// Confirm settings
	//console.log(settings);
	
	useLockableKeyboard = settings['lockable_keyboard'];
	useLogGames = settings['log_games'];
	useShirtNumbers = settings['shirt_numbers'];
	useSaveLocation = settings['save_location'];
	userEmail = settings['user_email'];
	
	if(useLockableKeyboard) {
		$("#lockable-startpage").prop( "checked", true );
	}
	
	if(useShirtNumbers) {
		$("#use-playershirtnum").prop( "checked", true );
	}
	
	if(useLogGames) {
		$("#log-games").prop( "checked", true );
	}
	
	if(useSaveLocation) {
		$("#log-games").prop( "checked", true );
	}
	
	if(userEmail) {
		$("#gps-trackning").prop( "checked", true );
	}
	
}

// Add Player
function addPlayer(name) {
    currentPlayer = new Player(name, players[name]);
    
    // use JQM PopUp
    $( "#positionSelector" ).popup( "open", {
	    transition: "flow",overlayTheme: "a"
	});
    $('#teamcompletebutton').show();
}

// Count positions
function countActivePlayers() {
	var countActive = 0;
	var countBenched = 0;
	var i;
	
	for (i in activePlayers) {
		if (activePlayers.hasOwnProperty(i)) {
			countActive++;
		}
	}

	for (i in benchPlayers) {
		if (benchPlayers.hasOwnProperty(i)) {
			countBenched++;
		}
	}
	
	totalTeam = countActive + countBenched;
	
	$('#players-container #active-players-badge').text(countActive);
	$('#players-container #benched-players-badge').text(countBenched);
	$('#players-container #total-players-badge').text(totalTeam);

	if(totalTeam > 0 && totalTeam < 2) {
		$("#current-team").addClass('animated tada active');
		$('#current-team').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$('#current-team').removeClass('animated tada');
		});
	} else {
		$("#current-team").addClass('animated tada');
		$('#current-team').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$('#current-team').removeClass('animated tada');
		});
	}

}

// Set positions
function setPosition(position) {
    if(position != 'BENCH'){
        $('#'+position).remove();
        $( "#positionSelector" ).find('#'+position).remove();
        
        // Remove player
        popRemovePlayer(currentPlayer.name);

        activePlayers[currentPlayer.name] = currentPlayer;
        activePlayers[currentPlayer.name].addPosition(new Position(position));
    } else {
        $("#playeronbench-container #playeronbench").append('<li id="b_'+currentPlayer.name+'" onClick="doSwitchPlayer(\''+currentPlayer.name+'\')" class="player-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><img height="44" width="30" src="img/'+currentPlayer.img+'"> '+currentPlayer.name+ ' '  + currentPlayer.viewPositions() + '</a></li>');
        benchPlayers[currentPlayer.name] = currentPlayer;

        // Remove player
        popRemovePlayer(currentPlayer.name);
    }
    $("#players-container").show();
    $("#positions").hide();
    $("#positionSelector").popup( "close" );
    $("#teamcompletebutton").show();
    countActivePlayers();
}

// Change player
function changePlayer(name){
    currentPlayer = activePlayers[name];
    $("#start-timer #active-players-container").hide();
    $("#playeronbench-container #current-player .name").text(currentPlayer.name);
    $("#playeronbench-container").show();
    $("#start-timer #gameover").hide();
    $("#start-timer #back").show();
}

// Do switch player
function doSwitchPlayer(name){
    var p = benchPlayers[name];
    var position = new Position(currentPlayer.positions[currentPlayer.positions.length-1].position);
    position.startTime = new Date();
    p.addPosition(position);
    $("#start-timer #playeronbench-container #playeronbench").append('<li id="b_'+currentPlayer.name+'" onClick="doSwitchPlayer(\''+currentPlayer.name+'\')" class="player-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><img height="44" width="30" src="img/'+currentPlayer.img+'"> '+currentPlayer.name+ ' ' +currentPlayer.viewPositions()+'</a></li>');

    activePlayers[name] = p;
    currentPlayer.endCurrentPosition();
    delete activePlayers[currentPlayer.name];
    delete benchPlayers[name];
    benchPlayers[currentPlayer.name] = currentPlayer;
    $('#b_'+name).remove();

    $("#start-timer #active-players-container").show();
    $("#start-timer #playeronbench-container").hide();
    $("#start-timer #gameover").show();
    $("#start-timer #back").hide();

}

function back(){
    $("#start-timer #players-container").show();
    $("#start-timer #playeronbench-container").hide();
    $("#start-timer #gameover").show();
    $("#start-timer #back").hide();
}

function unlock(){
    $("#start-timer #lockscreen").hide();
    $("#start-timer #gameover").show();
}

function lock(){
    $("#start-timer #lockscreen").show();
    $("#start-timer #gameover").hide();
}

function teamComplete(){
    $('#start-timer #players-active li').remove();
    //$('#start-timer #teamcompletebutton').hide();
    $("#start-timer #startgame").show();
    
    
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#start-timer", { role: "page" } );
    
    
    updateActiveView();
}

// Start game
function startGame(){
    startTime = new Date();
    $('#start-timer .ui-content').addClass('timer-active');
    $("#start-timer #time-container").show();
    $("#start-timer #startgame").hide();
    $("#current-team").hide();
    
    var d = new Date();
    for (var name in activePlayers) {
        activePlayers[name].positions[activePlayers[name].positions.length-1].startTime = d;
    }
    loopId = setInterval(updateActiveView, 1000);
    
    $("#start-timer #gameover").show();
    lock();
}

// Update active view
function updateActiveView(){
    $('#start-timer #active-players-container #active-players li').remove();
    for (var name in activePlayers) {
        $("#start-timer #active-players-container #active-players").append('<li id="'+activePlayers[name].name+'" onClick="changePlayer(\''+activePlayers[name].name+'\')" class="player-card ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right ui-icon-arrow-r"><img height="44" width="30" src="img/'+players[name]+'"> <span class="position-key">'+activePlayers[name].positions[0].position+'</span>'+activePlayers[name].toString()+'</a></li>');
    }
    if(startTime != null){
		eTime = getElapsedTime(startTime, new Date());
		eMinutes = eTime['minutes'];
		eSeconds = eTime['seconds'];
		
		eSeconds = eSeconds < 10 ? "0" + eSeconds : eSeconds;
		eMinutes = eMinutes < 10 ? "0" + eMinutes : eMinutes;
	    
	    $('#start-timer #time-container #time').html('<div class="elapsed_time"><div id="elapsed_seconds">'+eMinutes+'</div> <div class="divider">:</div> <div id="elapsed_minutes">'+eSeconds+'</div> </div>');
    }
}

// Game over
function gameOver(){
    $("#start-timer #gameover").hide();
    clearInterval(loopId);
    $('#players-container #players li').remove();
    for (var name in activePlayers) {
        var player = activePlayers[name];
        player.endCurrentPosition();

        $("#players-container #players").append('<li id="'+player.name+'" onClick="" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right"><b><u>'+player.name+'</u></b><br/> '+player.getStatistic()+ '</a></li>');
    }
    for (var name in benchPlayers) {
        var player = benchPlayers[name];
        $("#players-container #players").append('<li id="'+player.name+'" onClick="" class="ui-first-child ui-last-child"><a href="#" class="ui-btn ui-btn-icon-right"><b><u>'+player.name+'</u></b><br/> '+player.getStatistic()+ '</a></li>');
    }
    $("#init").show();
}

// Get elapsed time
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

// Setup jQuery functions
$(document).ready(function($) {
	
	// FastClick
	FastClick.attach(document.body);
	
	$('#positions .cancel').on('click', function() {
		$('#positions').hide();
	});
	
	// Lock button
	$('#lock-screen').on('click', function() {
		lock();
		$(this).toggleClass('active');
	});

	// Not used, this can be used if we separate to different pages for functions like timer
	// List players
	$(document).on("pagebeforeshow","#players-setup",function(){ // When entering pagetwo
		//listPlayers();
	});
	
	// List positions
	$(document).on("pagebeforeshow","#positions-setup",function(){ // When entering pagetwo
		//listPositions();
	});
	
	// init Settings
	initSettings();
	
	// Form change event
	$( "#settings-form" ).change(function() {
		console.log( "Settings changed!" );
		$('#settings-form input[type=checkbox]').each(function () {
		    var sThisVal = (this.checked ? "1" : "0");
		    settingOption = $(this).attr('id');
		    settings[settingOption] = sThisVal;
		});
		console.log( settings );
	});
	
	// Create player
	$('#createPlayerForm button').on('click', function(e) {
		
		$("#popupCreatePlayer").popup( "close" );
		
		e.preventDefault();
		console.log('save');
		createPlayer();
		
	});
});

// Page init
$(document).on('pageinit','#splash',function() {
	// the .on() method does require jQuery 1.7 + but this will allow
	// you to have the contained code only run when the #splash page is initialized.
	//$( ":mobile-pagecontainer" ).pagecontainer( "change", "confirm.html", { role: "dialog" } );
	setTimeout(function(){
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "#start", { role: "page" } );
	}, 4000);
});




$(function() {      
  //Keep track of how many swipes
  var count=0;
  //Enable swiping...
  $("#lockscreen #swipe-unlock").swipe( {
    //Single swipe handler for left swipes
    swipeLeft:function(event, direction, distance, duration, fingerCount) {
      //$(this).text("You swiped " + direction + " " + ++count + " times " );
      //$(this).text("Unlocked");
      unlock();
      
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold:100
  });
});
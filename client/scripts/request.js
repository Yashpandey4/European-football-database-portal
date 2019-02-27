// all post request for different pages and hanlding of table formulation



function createTable(data,usr){
  var num = Object.keys(data).length;
	for(var i=0;i<num;i++)
	{
		var key = Object.keys(data[i]);
		var num2 = Object.keys(data[i][key]).length;
		for(var j=0;j<1;j++)
		{
			var kh = Object.keys(data[i][key][j]);
			var b = Object.keys(kh).length;
			usr.innerHTML += "<div style='position:absolute'>";
			var myTable= "<table class='stab' border='1'><tr>";
			for(var k=0;k<b;k++)
			{
				myTable+= "<td style='color: red;'>"+kh[k]+"</td>";
			}
			myTable+="</tr>"
			}
			for(var j=0;j<num2;j++)
			{
				var kh = Object.keys(data[i][key][j]);
				myTable+="<tr>";
				for(var k=0;k<kh.length;k++)
				{
					var d = data[i][key][j][kh[k]];
					myTable+="<td>"  + d + "</td>";
				}
				myTable+="</tr>";
			}
		  myTable+="</table><br><br>"
		  usr.innerHTML += myTable;
		  usr.innerHTML += "</div>";
	}
}

// function createTable2(data,usr){

// 		var key = Object.keys(data).length;
// 		console.log(data[key-1])
// 		var num2 = Object.keys(data[key]);
// 		for(var j=0;j<1;j++)
// 		{
// 			var kh = Object.keys(data[key][j]);
// 			var b = Object.keys(kh).length;
// 			usr.innerHTML += "<div style='position:absolute'>";
// 			var myTable= "<table class='stab' border='1'><tr>";
// 			for(var k=0;k<b;k++)
// 			{
// 				myTable+= "<td style='color: red;'>"+kh[k]+"</td>";
// 			}
// 			myTable+="</tr>"
// 			}
// 			for(var j=0;j<num2;j++)
// 			{
// 				var kh = Object.keys(data[key][j]);
// 				myTable+="<tr>";
// 				for(var k=0;k<kh.length;k++)
// 				{
// 					var d = data[key][j][kh[k]];
// 					myTable+="<td>"  + d + "</td>";
// 				}
// 				myTable+="</tr>";
// 			}
// 		  myTable+="</table><br><br>"
// 		  usr.innerHTML += myTable;
// 		  usr.innerHTML += "</div>";
// }

function setter(id){
  var usr = document.getElementById("hello");
  usr.innerHTML = "";
  if(id=="player"){
  	usr.innerHTML += '<div class="selector">\
        <div class="input-select" align="center" width="480" heig>\
          <select data-trigger="" name="choices-single-default">\
          <option placeholder="">Category</option>\
          <option onclick="playerPost(1);">PLAYER  By Height</option>\
          <option onclick="playerPost(2);">PLAYER  By </option>\
          <option onclick="playerPost(3);">PLAYER  By Year</option>\
          <option onclick="playerPost(4);">PLAYER  Info by Birth</option>\
          <option onclick="playerPost(5);">PLAYER Rating</option>\
          <option>TEAM</option>\
          <option>PLAYING POSITION</option>\
          </select>\
        </div>\
        </div>\
    </div><section id="player"></section>'
  }
  else if(id=="stat"){
    usr.innerHTML += ' <div class="selector">\
        <div class="input-select" align="center" width="480" heig>\
          <select data-trigger="" name="choices-single-default">\
          <option placeholder="">Category</option>\
          <option onclick="statPost(1);">PLAYER  By Birth</option>\
          <option onclick="statPost(2);">PLAYER  By Height</option>\
          <option onclick="statPost(3);">PLAYER  By Year</option>\
          <option onclick="statPost(4);">PLAYER  Info by Birth</option>\
          <option onclick="statPost(5);">PLAYER Rating</option>\
          </select>\
        </div>\
        </div>\
    </div><section id="stat"></section>'
  }else if(id=="top"){
        usr.innerHTML += ' <div class="selector">\
        <div class="input-select" align="center" width="480" heig>\
          <select data-trigger="" name="choices-single-default">\
          <option placeholder="">Category</option>\
          <option onclick="topPost(1);">topPlayersByoverall_rating</option>\
          <option onclick="topPost(2);">topPlayersBypotential</option>\
          <option onclick="topPost(3);">topPlayersBycrossing</option>\
          <option onclick="topPost(4);">topPlayersByfinishing</option>\
          <option onclick="topPost(5);">By Heading accuracy</option>\
          <option onclick="topPost(6);">By Short passing</option>\
          <option onclick="topPost(7);">By short passing</option>\
          <option onclick="topPost(9);">By dribbling</option>\
          <option onclick="topPost(10);">By curve</option>\
          <option onclick="topPost(11);">By free kick accuracy</option>\
          <option onclick="topPost(12);">By  long passing</option>\
          <option onclick="topPost(13);">By ball control</option>\
          <option onclick="topPost(14);">By acceleration</option>\
          <option onclick="topPost(15);">By sprint speed</option>\
          <option onclick="topPost(16);">By agility</option>\
          <option onclick="topPost(17);">By rection</option>\
          </select>\
        </div>\
        </div>\
    </div><section id="top"></section>'
  }
  else if(id=="coun"){
    usr.innerHTML += "<div style='text-align:center;color:white'>Your current country is :</div><br><br>"
    usr.innerHTML += '<div style="text-align:center;color:white">Update your country:<br><br><div class="selector">\
            <div class="input-select" align="center" width="480" height=auto>\
              <select data-trigger="" name="choices-single-default">\
                <option placeholder="">Category</option>\
                <option onclick="poster();">PLAYER NAME</a></option>\
                <option>PLAYER ID</option>\
                <option>NATIONALITY</option>\
                <option>AGE</option>\
                <option>OVERALL RATING</option>\
                <option>TEAM</option>\
                <option>PLAYING POSITION</option>\
              </select>\
            </div>\
          </div>\
          </div>'
  }
  else if(id=="cplayer"){
    usr.innerHTML += "<h1 style='text-align:center;color:white;'>Create New Player</h1><br>"
    usr.innerHTML += "<form style='text-align:center;padding:auto;color:white;'>\
                      <label for='pname'>Player Name</label>\
                     <input type='text' id='pname' name='pname' required><br><br>\
                     <label for='dob'>Date of Birth</label>\
                     <input type='text' id='dob' name='dob' required><br><br>\
                     <label for='pname'>Height</label>\
                     <input type='text' id='height' name='height' required><br><br>\
                     <label for='pname'>Weight</label>\
                     <input type='text' id='weight' name='weight' required><br><br>\
                     <button type='submit' style='padding:5px'>Submit</button>\
                     </form>\
                     "
  }
  else if(id=="cteam"){
    usr.innerHTML += "<h1 style='text-align:center;color:white'>Create New Team</h1><br>"
    usr.innerHTML += "<form style='text-align:center;color:white;padding:auto;'>\
                      <label for='pname'>Team Name</label>\
                     <input type='text' id='pteam' name='pteam' required><br><br>\
                     <label for='dob'>Short Name</label>\
                     <input type='text' id='sn' name='sn' required><br><br>\
                     <label for='league'>League</label><br><br>\
                     <div class='selector'  id='league'>\
            <div class='input-select' width='480' height=auto>\
              <select data-trigger='' name='choices-single-default'>\
                <option placeholder=''>Category</option>\
                <option onclick='poster();''>PLAYER NAME</a></option>\
                <option>PLAYER ID</option>\
                <option>NATIONALITY</option>\
                <option>AGE</option>\
                <option>OVERALL RATING</option>\
                <option>TEAM</option>\
                <option>PLAYING POSITION</option>\
              </select>\
            </div>\
          </div>\
          </form>\
          "
        }
  else if(id =="addCountry"){
    usr.innerHTML += "<h1 style='text-align:center;color:white'>Create New Country</h1><br>"
    usr.innerHTML += "<form style='text-align:center;color:white;padding:auto;' id='counform' action='/country/add' method='POST'>\
                      <label for='name'>Country Name</label>\
                     <input type='text' id='name' name='name' required></input><br><br>\
                      <button type='submit' style='padding:5px'>Submit</button>\
                      </form>\
                     "
  }
  else if(id == "country"){
  	$.post("/country/list").done((data,status)=>{
  	  //console.log(data)
  	  createTable(data,usr);
  	});
  }else if(id == "Leagues"){
    $.post("/country/league").done((data,status)=>{
      //console.log(data)
      createTable(data,usr);
    });    
  }else if(id == "teamAll"){
     usr.innerHTML += '</div><section id="team"></section>'
    console.log("team post")
    teamPost(1);
  }else if(id=="teamSeason"){
     usr.innerHTML += ' <div class="selector">\
        <div class="input-select" align="center" width="480" heig>\
          <select data-trigger="" name="choices-single-default">\
          <option placeholder="">Category</option>\
          <option onclick="teamPost(1);">All Teams</option>\
          <option onclick="teamPost(2);">PLAYER  By Height</option>\
          <option onclick="teamPost(3);">PLAYER  By Year</option>\
          <option onclick="teamPost(4);">PLAYER  Info by Birth</option>\
          <option onclick="teamPost(5);">PLAYER Rating</option>\
          </select>\
        </div>\
        </div>\
    </div><section id="team"></section>'
  }else if(id=="teamAllTime"){

  }
}


function playerPost(id){
  var obj = {code:id};
	$.post("/player/player",obj).done((data,status)=>{
	  createTable(data,usr);
	})
}

function statPost(id){
  console.log(id);
    obj = {code:id};
    $.post("/player/stat",obj).done((data,status)=>{
    var stat = document.getElementById("stat");
      stat.innerHTML = "";
      console.log(data)
    createTable(data,stat);
    parsedData = parseData(data);
    plot(parsedData);

  })
}

function topPost(id){
  console.log(id);
    obj = {code:id};
    $.post("/player/top",obj).done((data,status)=>{
    var stat = document.getElementById("top");
      stat.innerHTML = "";
      console.log(data)
    createTable(data,stat);

  })
}

function teamPost(id){
  console.log(id);
    obj = {code:id};
    $.post("/team/teams",obj).done((data,status)=>{
    var stat = document.getElementById("team");
      stat.innerHTML = "";
      console.log(data)
    createTable(data,stat);
      
  })
}
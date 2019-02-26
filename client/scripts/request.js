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

function setter(id){
  var usr = document.getElementById("hello");
  usr.innerHTML = "";
  if(id=="player"){
    usr.innerHTML += ' <div class="selector">\
            <div class="input-select" align="center" width="480" heig>\
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
  else if(id=="stat"){

  }
  else if(id=="coun"){
    usr.innerHTML += "<div style='text-align:center;color:white'>Your current country is :</div><br><br>"
    usr.innerHTML += '<div style="text-align:center;color:white">Update your country:<br><br><div class="selector">\
            <div class="input-select" align="center" width="480" heig>\
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
            <div class='input-select' width='480' heig>\
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

}
function playerPost(){
    $.post("/player/player").done((data,status)=>{
      createTable(data,usr);
    })
}
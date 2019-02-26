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
  else if("country"){
	$.post("/country/list").done((data,status)=>{
	  console.log(data)
	  createTable(data,usr);
	})
  }

}
function playerPost(){
	$.post("/player/player").done((data,status)=>{
	  createTable(data,usr);
	})
}
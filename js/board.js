var InGame = false;
const countmax = 5;
var player = 0; // Current Player (0 is O,1 is X)
var played_o = [],played_x = [], l_win = [];
var played_x_old = [],played_o_old = [];
var played_o_row = [],played_o_col = [],played_x_row = [],played_x_col = [];
var redo_x = [],redo_o = [];
var arrCheck = [];
var cross_x = {};
var cross_o ={};
var cross_p_x={};
var cross_p_o = {};
var n = 10;
var win = false;
var arrWin = [];
var arrWin_reversed = [];	
var board = {
	writeBoard: function(){
		var st = '';
		for(var i=0; i < n; i++){			
			for(var j=0; j < n; j++){
				st += '<div class="square" id="'+String( i).slice(-1)+String(j).slice(-1)+'" onclick="board.Click(' + i + ',' + j + ' )" onMouseOver="board.mouseOver(' + i + ',' + j + ' )" onMouseOut="board.mouseOut(' + i + ',' + j + ' )"></div>';
			};			
		}
		var board =  document.getElementById('board');
		board.innerHTML = st;
		board.setAttribute("style", 'display:grid;grid-template-columns: repeat('+ n +', 1fr)');
			
	},
	Click: function (row,col){
		if(win) return;
		var img = '<img src="./img/o.png">';
		var id = String('0' + row).slice(-1)+String('0' + col).slice(-1);
		if(document.getElementById(id).innerHTML !=="")return;

		if(player ==1){
			var played_x_reversed = [];
			img =  '<img src="./img/x.png">';
			played_x.push(id);
			console.log(played_x);
			played_x_old.push(id);
			console.log("OLD: "+played_x_old);
			cross_x[played_x.length-1]=[];
			cross_x[played_x.length-1].push(played_x[played_x.length-1]);
			// for(var value in cross_x){
			// 	console.log(cross_x[value]);
			// }
			this.arrContinuedDownX(cross_x);
			for(var value in cross_x){
				cross_x[value] = cross_x[value].filter((item, index) => cross_x[value].indexOf(item) === index);
				// console.log(cross_x[value]);
				if(cross_x[value].length==5){
					win = true;
					for( var i = 0;i<cross_x[value].length;i++){
						this.styleWin(cross_x[value][i]);
					}
				}
			}
			//CHECK WIN CHEO CHINH
			cross_p_x[played_x.length-1]=[];
			cross_p_x[played_x.length-1].push(played_x[played_x.length-1]);
			for(var value in cross_p_x){
				console.log(cross_p_x[value]);
			}
			this.arrContinuedUpX(cross_p_x);
			for(var value in cross_p_x){
				cross_p_x[value] = cross_p_x[value].filter((item, index) => cross_p_x[value].indexOf(item) === index);
				// console.log(cross_p_x[value]);
				if(cross_p_x[value].length==5){
					win = true;
					for( var i = 0;i<cross_p_x[value].length;i++){
						this.styleWin(cross_p_x[value][i]);
					}
				}
			}
			player = 0;
			for(var i = 0;i<played_x.length;i++){
				var value = played_x[i].split("").reverse().join("");
				played_x_reversed.push(value);
			}
			console.log('x reversed'+played_x_reversed);
			var played_x_sort = played_x.sort();
			console.log('x'+played_x_sort);
			if(this.isWin(played_x_sort)==1){
				win = true;
				for( var i = 0;i<arrWin.length;i++){
					this.styleWin(arrWin[i]);
				}
			}		
			if(this.isWin(played_x_reversed.sort())==1){
				win = true;
				for(var i = 0;i<arrWin.length;i++){
					var value = arrWin[i].split("").reverse().join("");
					arrWin_reversed.push(value);
				}
				for( var i = 0;i<arrWin_reversed.length;i++){
					// console.log(arrWin_reversed);
					this.styleWin(arrWin_reversed[i]);
				}	
					
			}
		}
		else {
			player =1;
			played_o.push(id);
			played_o_old.push(id);
			//CHECK WIN CHEO DOC
			cross_o[played_o.length-1]=[];
			cross_o[played_o.length-1].push(played_o[played_o.length-1]);
			// for(var value in cross_o){
			// 	console.log(cross_o[value]);
			// }
			this.arrContinuedDownO(cross_o);
			for(var value in cross_o){
				cross_o[value] = cross_o[value].filter((item, index) => cross_o[value].indexOf(item) === index);
				// console.log(cross_o[value]);
				if(cross_o[value].length==5){
					win = true;
					for( var i = 0;i<cross_p_x[value].length;i++){
						this.styleWin(cross_p_x[value][i]);
					}

				}
			}
			//CHECK WIN CHEO CHINH
			cross_p_o[played_o.length-1]=[];
			cross_p_o[played_o.length-1].push(played_o[played_o.length-1]);
			// for(var value in cross_p_o){
			// 	console.log(cross_p_o[value]);
			// }
			this.arrContinuedUpO(cross_p_o);
			for(var value in cross_p_o){
				cross_p_o[value] = cross_p_o[value].filter((item, index) => cross_p_o[value].indexOf(item) === index);
				// console.log(cross_p_o[value]);
				if(cross_p_o[value].length==5){
					win = true;
					for( var i = 0;i<cross_p_o[value].length;i++){
						this.styleWin(cross_p_o[value][i]);
					}
				}
			}
			//TAO MANG DOI NGUOC=>CHECK WIN DOC
			var played_o_reversed = [];
			for(var i = 0;i<played_o.length;i++){
				var value = played_o[i].split("").reverse().join("");
				played_o_reversed.push(value);
			}
			var played_o_sort = played_o.sort();
			console.log('o'+played_x);
			if(this.isWin(played_o_sort) ==1){
				win=true;
				for( var i = 0;i<arrWin.length;i++){
					this.styleWin(arrWin[i]);
				}
			}
			if(this.isWin(played_o_reversed.sort()) ==1){
				win = true;
				for(var i = 0;i<arrWin.length;i++){
					var value = arrWin[i].split("").reverse().join("");
					arrWin_reversed.push(value);
				}
				for( var i = 0;i<arrWin_reversed.length;i++){
					this.styleWin(arrWin_reversed[i]);
				}	
			}							
		}
		document.getElementById(id).innerHTML = img;	
	},
	mouseOver:function(row,col)
	{
		if(win) return;
		var id = String('0' + row).slice(-1)+String('0' + col).slice(-1);
		var square = document.getElementById(id);
		square.style.backgroundColor = "#c99c3b";
		
		
	},
	mouseOut:function(row,col)
	{
		if(win) return;
		var id = String('0' + row).slice(-1)+String('0' + col).slice(-1);
		var square = document.getElementById(id);
		square.style.backgroundColor = "";
		
	},
	styleWin : function(id){
		var square = document.getElementById(id);
		square.style.backgroundColor="#0dd5ef";
	},
	isSameRow :function(subArray)
	{	
		if(subArray.length >4){
			//  console.log("Subarray: "+subArray);
			var result = 1;
			var st = subArray[0].slice(0,1);
			for(var i=0;i<5;i++)
			{
				var t =  subArray[i].slice(0,1);
				if(t === st){ 
				}
				else{
					result = 0;
					break;
				}		
			}
			return result;
		}		
	},
	isContinous: function(arr){
		var result = 1;
		var count = 4;
		for(var i=0;i<4;i++){
			var str_x = arr[i].slice(-1);
			var str_y = arr[i+1].slice(-1);	
			var kq = str_y-str_x;
			if(kq==1){
				count--;
			}else{
				result =0;
				break;
			}
		}
		if(count ==0){
			result =1;
		}
		return result;
		
	},
	isContinous1: function(arr){
		var result = 1;
		var count = 4;
		for(var i=0;i<4;i++){
			var str_x = arr[i].slice(-1);
			var str_y = arr[i+1].slice(-1);	
			var kq = str_x-str_y;
			if(kq==1){
				count--;
			}else{
				result =0;
				break;
			}
		}
		if(count ==0){
			return 1;
		}
		return 0;
		
	},
	isCross:function(arr){
		if(arr.length >4){
			for(var j=0;j<arr.length;j++)
			{
				var subArray = arr.slice(j,j+5);
				console.log("subArray: "+subArray);
				if(subArray.length>4){
					var played_reversed = [];
						for(var i = 0;i<subArray.length;i++){
							var value = subArray[i].split("").reverse().join("");
							played_reversed.push(value);
						}
						console.log("subarray: "+subArray);
						console.log("cross reversed: "+played_reversed);
						if(this.isContinous1(subArray) && this.isContinous(played_reversed)){
							console.log("THANH CONG ROI");
						}
						if(this.isContinous(subArray)&& this.isContinous(played_reversed)){
							console.log("THANH CONG ROI");
						}
						else{ console.log("THAT BAI ROI MA OI");}
				}
			}
		}
	},
	isWin : function(arr){
		if(arr.length >4){
			var kq = 0;
			for(var j=0;j<arr.length;j++)
			{
				var subArray = arr.slice(j,j+5);			
				if(this.isSameRow(subArray)==1){
					kq=  this.isContinous(subArray);
					if(kq==1){
						arrWin = subArray;
						return kq;
					}
				 }
			}
			return kq;
		}
		
	},
	numContinued : function(value){
		var x = parseInt(value.slice(0,1))+1;
		var y = parseInt(value.slice(-1))-1;
		var check = String(x)+String(y);
		return check;
	},
	checkCross: function(id,value){
		for(var i=1;i<5;i++){
			var x = parseInt(id.slice(0,1))+i;
			var y = parseInt(id.slice(-1))-i;
			var check = String(x)+String(y);
			if(value==check){
				return true;
			}
		}
		return false;
	},
	checkCross1: function(id,value){
		for(var i=1;i<5;i++){
			var x = parseInt(id.slice(0,1))+i;
			var y = parseInt(id.slice(-1))+i;
			var check = String(x)+String(y);
			if(value==check){
				return true;
			}
		}
		return false;
	},
	arrContinuedDownX : function(cross){
		for(var i =0;i<played_x.length;i++){
			for(var value in cross){
				if(this.checkCross(cross[value][0],played_x[i])){
					cross[value].push(played_x[i]);
				}
			}
		}
	},
	arrContinuedDownO : function(cross){
		for(var i =0;i<played_o.length;i++){
			for(var value in cross){
				if(this.checkCross(cross[value][0],played_o[i])){
					cross[value].push(played_o[i]);
				}
			}
		}
	},
	arrContinuedUpX : function(cross_p){
		for(var i =0;i<played_x.length;i++){
			for(var value in cross_p){
				if(this.checkCross1(cross_p[value][0],played_x[i])){
					cross_p[value].push(played_x[i]);				
				}
			}
		}
	},
	arrContinuedUpO : function(cross_p){
		for(var i =0;i<played_o.length;i++){
			for(var value in cross_p){
				if(this.checkCross1(cross_p[value][0],played_o[i])){
					cross_p[value].push(played_o[i]);				
				}
			}
		}
	},
	exit:function(){
		alert("Bạn sẽ thua nếu thoát khỏi trò chơi!");
		if(player==0){
			alert("X win");
		}else{
			alert("O win");
		}
	},
	new: function(){
		this.writeBoard();
		win = false;
		played_o =[];
		played_x = [];
		arrWin = [];
	},
	undo: function(){
		if(win) return;
		// if(played_x.length==0) return;
		// if(played_o.length==0) return;
		if(player==0){
			var value = played_x_old.pop();
			redo_x.push(value);
			played_x.splice(played_x.indexOf(value),1);
			document.getElementById(value).innerHTML = "";
			player = 1;
			console.log("OLD: "+played_x_old);
			console.log(played_x);
			return;
		}
		else{
			var value = played_o_old.pop();
			redo_o.push(value);
			//xoa id trong mang cu
			played_o.splice(played_o.indexOf(value),1);
			document.getElementById(value).innerHTML = "";
			player = 0;
			console.log("OLD: "+played_o_old);
			console.log(played_o);
			return;
		}
	},
	redo: function(){
		if(player==0){
			if(redo_x.lenght==0) return;
			//xoa gtri ms choi
			console.log(played_x_old);
			var value = played_x_old.pop();
			played_x.splice(played_x.indexOf(value),1);
			//lay gti vua undo
			var value_old = redo_x.shift();
			//cho vao mang 
			played_x.push(value_old);
			played_x_old.push(value_old);
			var img = '<img src="./img/x.png">';
			document.getElementById(value_old).innerHTML = img;
			document.getElementById(value).innerHTML = "";
			player = 1;
		}else{
			if(redo_o.lenght==0) return;
			console.log(played_o_old);
			//xoa gtri ms choi
			var value = played_o_old.pop();
			played_o.splice(played_o.indexOf(value),1);
			//lay gti vua undo
			var value_old = redo_o.shift();
			//cho vao mang 
			played_o.push(value_old);
			played_o_old.push(value_old);
			var img = '<img src="./img/o.png">';
			document.getElementById(value_old).innerHTML = img;
			document.getElementById(value).innerHTML = "";
			player = 0;
		}
	}
};
board.writeBoard();

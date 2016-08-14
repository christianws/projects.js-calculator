/*

----> emulate this design http://thecodeplayer.com/walkthrough/javascript-css3-calculator


What is left to do ->

- Figure out floating number bollox
- ansMem stuff

// http://speakingjs.com/es5/ch11.html
http://speakingjs.com/es5/ch11.html

var ans = Math.round(.452 * .4 * 100) / 100 ;// 0.08
ans = Math.round(.452 * .4 * 10000) / 10000 // 0.1808
Number((.452 * .4).toFixed(4)) // 0.1808
https://stackoverflow.com/questions/566564/math-roundnum-vs-num-tofixed0-and-browser-inconsistencies



console.log(ans);

*/


// trimming if past max chars in calc-display_inner
$('document').ready(function(){
		 
		var opRange = ["+","-","×","÷"];
 		var numRange = ["0","1","2","3","4","5","6","7","8","9"];
		createButtons();
		
	/*--- This creates the buttons so you don't have to edit the HTML all the time ---*/
		function createButtons(){
			var buttons =[ "AC" , "CE" , "%", "÷", "7", "8", "9", "×", "4","5","6","-","1","2","3","+",".","0","Ans","=" ];

			for(var x in buttons){
				
				var addButtonClass;
				console.log("buttons[x]: " + buttons[x]);

				if(opRange.includes(buttons[x] ) || buttons[x]==="%"  ||  buttons[x]==="CE"){ 
					addButtonClass =  "op";
				}
				if(numRange.includes(buttons[x] || buttons[x] ==="." ||  buttons[x]==="%"  )){
					addButtonClass =  "num";
				}
				if(buttons[x] ==="="){
					addButtonClass ="eval";
				}
				if(buttons[x] ==="AC" ){
					addButtonClass = "clear";
				}
				//if(buttons[buttons[x]])
				console.log("addBUttonClass chosen: " + addButtonClass);
				var buttonHtml = 	'<button id="' + buttons[x]	+ "_button" + '" class="calc-button secondaryClass">' +	buttons[x]	+ '</button>';
				
				if(addButtonClass){
					console.log("about to add secondary class because addButtonClass is found");
					//insert the scondary class
					buttonHtml = buttonHtml.replace("secondaryClass",addButtonClass);
				}else{
					buttonHtml = buttonHtml.replace("secondaryClass", '');
				}
				//reset addButtonClass
				addButtonClass=undefined;
				//add rendered button
				$( "#buttons-con_inner" ).append( buttonHtml);
			}//** for

		}



	/*--- Dsiplay ---*/
		var calcDis = $('#calc-display_inner');
		var memDis = $('#memory-display');
		console.log("calcDis: " + calcDis);
		var fontFamily = calcDis.css("font-family");
		var fontSize = calcDis.css("font-size");
		var disWidth = calcDis.css("width");
		var disMargins = parseInt(calcDis.css("margin-left"),10) + parseInt(calcDis.css("margin-right"),10);
		
		/* find the length width of one character */
		function getCharWidth(fontFamily, fontSize) {
		    var div = document.createElement("div");
		    div.style.position = "absolute";
		    div.style.visibility = "hidden";
		    div.style.fontFamily = fontFamily;
		    div.style.fontSize = fontSize;
		    div.innerHTML = "J";
		    document.body.appendChild(div);
		    var width = div.offsetWidth;
		    document.body.removeChild(div);
		    return(width);
		}
		var fontWidth = getCharWidth(fontFamily,fontSize);
		var maxChars = (Math.floor ( ((parseInt(disWidth, 10) - parseInt(disMargins,10)) / parseInt(fontWidth, 10))));
	
		// limiting num of chars in display	
		function displayTrim(){
			console.log("---maxCharCheck()---");
			var calcDisText = calcDis.text().trim();
			console.log("num of chars in display: " + calcDisText.length + " text - > " + calcDisText );
	
			if(calcDisText.length > maxChars){
				calcDis.text(calcDisText.substring(0,maxChars));
			}
			//if ( calcDis.text().length )
			calcDisText = calcDis.text().trim();
			console.log("num of chars in display: " + calcDisText.length + " text - > " + calcDisText );
			console.log("--------------------");
		}

		displayTrim();
		
		//reset the display incase of any html lurking
		function updateDisplay(str){
 			calcDis.html(str);
 			ansDisplayed=false; // no longer answer because the display has been changed
 		}
 		function updateMem(str){
 			memDis.html(str);
 		}

	/*-----------------*/

 		var inputStr = "";
 		var ansMem ;
 		var ansDisplayed = false;


 		//console.log(buttons.indexOf(numArr[1]));

 		$('.calc-button').click(function(){
		 	//
		 	console.log("---.calc-button.click()---");
		 	console.log("inputStr : " + inputStr);
		 	console.log("incalcbutton ansDisplayed: " + ansDisplayed);
		 	var pressed = this.id.split("_")[0]; //the id of these classes are +_button, -_button etc. 
		 	var lastChar = inputStr.trim()[inputStr.trim().length - 1];
	 		var lastChars = inputStr.trim().substring(inputStr.length-2,inputStr.length);
	 	
			function addOperator(){
	 				if(lastChar == "÷" || lastChar == "×" || lastChar == "-" || lastChar == "+" ){
	 						// ÷ is last thing
	 						inputStr = inputStr.substr(0, inputStr.length-1)  + pressed ;
	 				}else{
	 						inputStr = inputStr +  pressed ;
	 				}
	 			
	 		}

			function addDecimal(){

					console.log("---addDecimal()---");
					var split=	splitStr(inputStr);
				
					if(opRange.includes(lastChar) || inputStr.length===0 ){   // if the lastChar was an op it means you are starting with decimal pt
						inputStr  +=  "0"+pressed;
						updateDisplay(inputStr);
					 	return;
					}else{ // there a number

							//this checks the last nmber of the split str to see if a decimal point is already included 
						if(split[split.length-1].indexOf('.') === -1){
						//if()[{ // if last num is a number
							console.log("proceed - decimal not found in last number of str");
							var lastNum = parseFloat(split[(split.length)-1]);
							console.log("lastNUm: " + lastNum);
							console.log(typeof lastNum);
							if(lastNum % 1 === 0){
								//no decimal in last num
								console.log("lastnum %1 != 0 : "  + (lastNum % 1));
								inputStr  +=  pressed;
								console.log(inputStr);
					 			updateDisplay(inputStr);
					 			return;
				 			}
			 			
			 			}else{
			 				console.log("decimal point already exists!");
			 			}


					}
					
			}


		
			 function splitStr(str){
						console.log("base str:" + str);
						var strArr =[];
						var lastNumIndex = 0; // used to find the index of last number
						
						//trim operators at end of str 
						function trimOperators(str){
							str.trim();
							var y = str.length-1;
							while(str[y] ==="+" || str[y] =="×" || str[y] == "÷" || str[y] == "-" ){
								//cut the operator off the end
								str = str.substring(0,y);
								y--;
							}
							return str;
						}
						str = trimOperators(str);
						for(i=0; i<str.length; i++){
							//%

							if(i===0 && str[i] === "-"){// do nothing if starts with -
							}else{
								console.log(str[i]);
								if (str[i] == "+" || str[i] =="×" || str[i] == "÷" || str[i] == "-" ){
									


									if(str[i-1] !== "+" && str[i-1] !=="×" && str[i-1] !== "÷" && str[i-1] !== "-"){
										//this pushes the number preceding it
										
										strArr.push(str.substring(lastNumIndex,i));
										
										//This pushes the operator
										strArr.push(str[i]);
										// ad plus 1 to make sure you don't push the operator next time
										
										lastNumIndex=i+1;
										console.log("lastNUmIndex: " + lastNumIndex);
									}else{
										// the minus will carry over and be included in the next num
									}
								}
								//if end
								if(i==str.length-1){
									// last part of loop so push the number
									strArr.push(str.substring(lastNumIndex,str.length));
									lastNumIndex=i+1;
								}
							}
						}
						
						return strArr;
			} // split strm

			function calcAns(str){
				
				console.log("------calcAns()------");

				function ansReplace(str){
					console.log("---in ansReplace()---");
					return str.replace(/Ans/g,ansMem);
				}
				str = ansReplace(str);
				var split = splitStr(str);
				var ans;
				console.log("split below: ");
				console.log( split);
				
				var math = {
				    "+": function (x, y) { return x + y },
				    "-": function (x, y) { return x - y },
				    "×": function (x, y) { return x * y },
				    "÷": function (x, y) { return x / y },
				};
				
				//console.log("math : " + math['+'](1, 4) );
				 var i=0;
				 var first, second, op;
				 
				 while(i<split.length){
				 
				 	if(i!==0){
					 	if(split[i] ==="+" || split[i] =="×" || split[i] == "÷" || split[i]== "-"){
					 		console.log("is op: " + split[i]);
					 		op = split[i];
					 	}else{
					 		console.log("is num: " + split[i]);
					 		
					 		// if there is a %
					 		if(split[i].indexOf("%") === -1){
					 			console.log("have not found % in: " + split[i]);
					 			second = parseFloat(split[i]);
					 	
					 		}else{ // if % is found
					 			// if the op before is ÷ or × convert the % to a decimal
					 			if(op ==="÷" || op==="×" ){
					 				console.log("op before % is ÷ or x");
					 				second = 0.01 * parseFloat(split[i]); // convert to decimal
					 			}
					 			// if the op before is - or + convert the % to a % of the first number
					 			if(op ==="+" || op==="-" ){
					 				console.log("op before % is + or -");
					 				second = first * ( 0.01 * parseFloat(split[i])); // convert to decimal
					 			}
					 		
					 			
					 		}
					 		
					 		
					 	}
				 	}else{
				 		first=parseFloat(split[i]);
				 	}
				 
				 	console.log("first: " + first + " op: " + op + " second: " + second);
				 	
				 	// if we have all we need
				 	if(first,op,second){
				 		ans = math[op](first,second);
				 		first = ans;
				 		op, second = undefined;
				 	}
					if(ans){
					console.log("ans : " + ans);
					}
				 	// should be 178 and no op
				 	split.shift;
				 	i++;
				 	
				 }

				updateDisplay(ans);
				if(ans){
					inputStr = ans.toString()
					ansMem = ans.toString();
				};
				

			}// end of calc Ans

			/* --- CALC FUNCTIONS ------- */
			if( pressed == "AC"){
	 				inputStr = "";
	 				ansMem = 0;
	 				updateDisplay("0");
	 		}
	 		if( pressed == "CE"){
	 				if(lastChar==="s"){ // meanss Ans is the last thing
	 						inputStr = inputStr.trim().substr(0,inputStr.length-3);
	 				}else{
	 					inputStr = inputStr.trim().substr(0,inputStr.length-1);
	 				}
	 				updateDisplay(inputStr);
	 		}
	 		if( pressed == "Ans"){
	 				console.log("ansMem: " + ansMem);
	 			
				
				if(ansMem){//if there is an answer in memory
					if(inputStr.length < maxChars-3){	// if max in str isn't hit -3 (-3 because of length on 'Ans')
							if(lastChar != "%" && !numRange.includes(lastChar)){

				 				inputStr += pressed;
				 				updateDisplay(inputStr);
				 			}else{
				 				inputStr += "×" + pressed;
				 				updateDisplay(inputStr);
				 			}
				 	}
	 			}	
	 		}
	 		if( pressed == "="){
	 				updateMem(inputStr);
	 				console.log("inputStr before send : " + inputStr);
	 				var result = calcAns(inputStr);
	 				updateDisplay(result);
	 				ansDisplayed = true;
	 				// if next thing to be pressed i a number set input string to 0
	 				console.log("just hit = ansDisplayed =  " + ansDisplayed);
	 		}

	 		// check that the str length is less
			if(inputStr.length < maxChars){	
				//console.log("str is longer than maxchars");
				
				/* ------ DECIMAL POINTS ------ */

				if(	pressed== "."){
					ansDisplayed=false;
					addDecimal();
				} 

				/* ------ NUMBERS ------ */
			 	if( parseInt(pressed) >= 0 &&  parseInt(pressed) <= 9  ){
		 			console.log("bout to parseInt ansDisplayed = " + ansDisplayed);
		 			if(ansDisplayed){// it means you are writing a number straight after the answer is displayed
		 				//reset inputStr & ansMem
		 				inputStr = "";
		 				console.log("just set input string to false and about to do the same with ansDisplayed");
		 				console.log("yo yo ansDisplayed+ " + ansDisplayed + " inputStr : " + inputStr);
		 				ansDisplayed=false;

		 			}

		 			if(lastChar != "%"){
		 				console.log(pressed + " its a number");
		 				inputStr += pressed;
		 				updateDisplay(inputStr);
		 			}else{
		 				inputStr += "×" + pressed;
		 				updateDisplay(inputStr);
		 			}
		 		}

	 			
	 			/* ------ OPERATORS ------ */
	 			if(lastChars !== "×-" && lastChars !== "÷-" && inputStr !== ""){ // if x- / +- is used you can only use numbers
		 		
		 			switch(pressed){
		 				case  "÷":
			 					addOperator();
			 					updateDisplay(inputStr);		
		 					break;
		 				case "×":
			 					addOperator();
			 					updateDisplay(inputStr);
		 					break;
		 				case "-":
		 					// add the negative symbol
		 					console.log("- pressed now!");
		 					if( lastChar == "+" || lastChar == "-" ){
		 						console.log("lastchar is + or -");
		 						inputStr =  inputStr.substr(0, inputStr.length-1) +  pressed ;
		 					}else{
		 						inputStr = inputStr +  pressed ;
		 					}
		 					updateDisplay(inputStr);
		 					// if last char pressed is x or / then you need to lock and wait for a number
		 					break;
		 				case "+":
		 						console.log("lastChars is /- or x- ");
		 						addOperator();
		 						updateDisplay(inputStr);	
		 					break;
		 				case "%":			
		 						if(lastChar !== "%" && lastChars[0] !== "%"){
		 							addOperator();
		 							updateDisplay(inputStr);
		 						}
		 					break;
		 			}// end of switch



	 			}else{

	 				console.log("+- or /- last thing");
	 			}

	 		}else{
	 			console.log("over the max chars");
	 		}



		}); // click buttons function
		


 		

	/*-----------------*/


});

	
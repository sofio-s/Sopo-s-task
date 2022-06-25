
(function(){
	
	var state = 1;
	var puzzle = document.getElementById('puzzle');

	
	solve(); // /solve funqciis gamodzaxeba, romelic tanmimdevrulad alagebs  areul ricxvebs
	

	puzzle.addEventListener('click', function(e){
		if(state == 1){
			// gadasvlis animacia, clasis saxels anichebs aqve
			puzzle.className = 'animate';
			shiftCell(e.target);
		}
	});
	
	// damatebula eventlistenerebi, gilak scramble-ze  clickis shemtxvevashi idzaxebs funqcias scramble
	document.getElementById('scramble').addEventListener('click', scramble);


	

	function shiftCell(cell){ //gadaiyvans ujras cariel adgilas
		
		//amowmebs aqvs aris tu ara ricxvi ujra
		if(cell.clasName != 'empty'){
			
			// imdebare, carieli ujris naxva
			var emptyCell = getEmptyAdjacentCell(cell);
			
			if(emptyCell){
				// droebiti monacemebi
				var tmp = {style: cell.style.cssText, id: cell.id};
				
				// cvlis id-s da stils
				cell.style.cssText = emptyCell.style.cssText;
				cell.id = emptyCell.id;
				emptyCell.style.cssText = tmp.style;
				emptyCell.id = tmp.id;
				
				if(state == 1){
					// amowmebs ricvbis mimdebrobas
					checkOrder();
				}
			}
		}
		
	}



	function getCell(row, col){ //abrunebs konkretul ujras svetis da striqonis parametrebismixdevit
	
		return document.getElementById('cell-'+row+'-'+col);
		
	}

	
	function getEmptyCell(){ //abrunebs cariel ujras
	
		return puzzle.querySelector('.empty');
			
	}
	
	
	function getEmptyAdjacentCell(cell){ //abrunebs ujris mimdebare cariel ujras, asetis arsebobis shemtxvevashi
		
		
		var adjacent = getAdjacentCells(cell); //aq imaxsovreb yvela mimdebare ujras qvemota funqciis gamoyenebit
		
		
		for(var i = 0; i < adjacent.length; i++){ //ciklit edzebs cariels yvela mimdebare ujridan
			if(adjacent[i].className == 'empty'){
				return adjacent[i]; //abrunebs cariel ujras 
			}
		}
		
		 
		return false; //abrunebs false-s tu carieli ujra ar arsebobs 
		
	}


	function getAdjacentCells(cell){ //am funqciiis sashualebit, vpoulobt konkretuli ujris yvela mimdebare ujras, zevit, qvevit, marcxniv da marjvnniv
		
		var id = cell.id.split('-');
		
		
		var row = parseInt(id[1]); //ujris poziciis indeqsebs vgebulobt, striqnis da svetis nomrebs
		var col = parseInt(id[2]);
		
		var adjacent = [];
		
		// yvela mimdebare ujras poulobs da adjacent masivshi imaxsovrebs
		if(row < 3){adjacent.push(getCell(row+1, col));}			
		if(row > 0){adjacent.push(getCell(row-1, col));}
		if(col < 3){adjacent.push(getCell(row, col+1));}
		if(col > 0){adjacent.push(getCell(row, col-1));}
		
		return adjacent; //abrunebs masivs sadac aris yvela mimdebare ujra
		
	}
	
	
	function checkOrder(){ //es funqcia amowmebs aris tu ara ricxvebis mimdevroba swori
		
		// amowmebs aris tu ara carieli ujra swor adgilas, anu boloshi
		if(getCell(3, 3).className != 'empty'){
			return;
		}
	
		var n = 1;
		// satitaod yvela ujras miyveba da amowmebs ricxvebs
		for(var i = 0; i <= 3; i++){
			for(var j = 0; j <= 3; j++){
				if(n <= 15 && getCell(i, j).innerHTML != n.toString()){
					// tu ar aris swori tanmimdevroba, wydeba funqcia
					return;
				}
				n++; //tu konkretul bijamde sworia tanmimdevroba, shemdeg ujraze gadavdivart
			}
		}
		
		// cikli warmatebit dasrula da tanimdevroba sworia/ gamova success message momxmareblistvis
		if(confirm('Congrats, You did it! \nScramble the puzzle?')){
			scramble();
		}
	
	}
function solve(){ //solve funqcia, romelic tanmimdevrulad alagebs  areul ricxvebs
		
		if(state == 0){
			return;
		}
		
		puzzle.innerHTML = '';
		
		var n = 1;
		for(var i = 0; i <= 3; i++){
			for(var j = 0; j <= 3; j++){
				var cell = document.createElement('span');
				cell.id = 'cell-'+i+'-'+j;
				cell.style.left = (j*80+1*j+1)+'px';
				cell.style.top = (i*80+1*i+1)+'px';
				
				if(n <= 15){
					cell.classList.add('number');
					cell.classList.add((i%2==0 && j%2>0 || i%2>0 && j%2==0) ? 'dark' : 'light');
					cell.innerHTML = (n++).toString();
				} else {
					cell.className = 'empty';
				}
				
				puzzle.appendChild(cell);
			}
		}
		
	}
	
	function scramble(){ //ricxvebis arevis funqcia
	
		if(state == 0){
			return;
		}
		
		puzzle.removeAttribute('class');
		state = 0;
		
		var previousCell;
		var i = 1;
		var interval = setInterval(function(){
			if(i <= 100){
				var adjacent = getAdjacentCells(getEmptyCell());
				if(previousCell){
					for(var j = adjacent.length-1; j >= 0; j--){
						if(adjacent[j].innerHTML == previousCell.innerHTML){
							adjacent.splice(j, 1);
						}
					}
				}
				// igebs random mimdeare ujras da imaxsovrebs mas momdevno iteraciistvis 
				previousCell = adjacent[rand(0, adjacent.length-1)];
				shiftCell(previousCell);
				i++;
			} else {
				clearInterval(interval);
				state = 1;
			}
		}, 5);

	}
	
	
	function rand(from, to){ //shemtxveviti ricxvebis generireba

		return Math.floor(Math.random() * (to - from + 1)) + from;

	}

}());
//window.addEventListener('load', function() {


        /////    SLUZI DA NE BI MOGAO SLUCAJNO DA SE ZATVORI PROGRAM
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
});




	let closeButton = document.querySelector(".close-button");
	let listContainer = document.querySelector(".list-container");
	let textContainer = document.querySelector(".text-container");
	let menuContainer = document.querySelector(".menu-container");
	let searchContainer = document.querySelector(".search-container");
	let searchListContainer = document.querySelector(".search-list-container");
	let headerText = document.getElementById("headerText");
	let state = "home";
	
	let oldHeaderText;
	
	const OpenedSongColor = "#bbbbbb";
	
	let backButton = document.querySelector(".back-button");
	let menuButton = document.querySelector(".menu-button");
	
	let resetButton = document.querySelector(".reset-button");
	let searchButton = document.querySelector(".search-button");
	let closeSearchButton = document.querySelector(".closeSearch-button");
	let inputTextSearch = document.getElementById("searchSong");
	let inputTextSearchValue = "";

	listContainer.innerHTML = ``;
	for(let i=0; i<listElements.length; i++){
		listContainer.innerHTML += 
		`<div style="background-color: ${listElements[i].songColor}" class="song-Id-${i.toString()} list-item">
			<h1>${listElements[i].songTitle}</h1>
			<h3>${listElements[i].songAuthor}</h3>
		</div>`;
		
		//console.log("pozz")
	}

	let alreadyOpenedSongs = [];
	let songListScrollSave = "empty";

	let listItem = document.querySelectorAll(".list-item");



	function loadSong(ev, indexInput="empty"){


		if(indexInput === "empty"){
			songListScrollSave = listContainer.scrollTop;
			//console.log('ScrollTop:', songListScrollSave);   /////    SACUVAJ PODATKE
			localStorage.setItem('songListScrollSaveStorage', songListScrollSave.toString());
			//listContainer.scrollTop = 0;
		}
		
		let targetSong = "empty";
		let targetSongIndex = "empty";

		if(ev === "input" && indexInput !== "empty")
		{
			targetSong = listContainer.childNodes[indexInput];
			targetSongIndex = indexInput;
		}
		
		else{

			for(let i=0; i<listContainer.childNodes.length; i++){
				if(listContainer.childNodes[i] === ev.target) 
				{
					targetSong = listContainer.childNodes[i];
					targetSongIndex = i;
					break;
				}
			}

		}

		if(targetSong !== "empty" && targetSongIndex !== "empty"){
			listContainer.style.display = "none";
			textContainer.style.display = "flex";
			backButton.style.visibility= "visible";
			//targetSong.style.backgroundColor = "#ff000025"
			targetSong.style.backgroundColor = OpenedSongColor;
			textContainer.innerHTML = ``;
			textContainer.innerHTML += `<h3>${listElements[targetSongIndex].songText}</h3>`;
			headerText.innerHTML = `${targetSong.childNodes[1].innerText} <span style="color:#1E90FF;">${listElements[targetSongIndex].songKey}</span>`;
			textContainer.scroll(0, 0);
			
			state = "song";
			/////            RESAVAJ SCROLL I OVERFLOW I INTONACIJE OBAVEZNO!!!!!!!!!!
		}
		
		if (alreadyOpenedSongs.length === 0){
			alreadyOpenedSongs.push(targetSongIndex);
		}
		else{
			let isSame = false;
			for(let i = 0; i < alreadyOpenedSongs.length; i++){
				if(targetSongIndex === alreadyOpenedSongs[i]) {
					isSame = true;
					break;
				}
			}
			if(isSame === false) alreadyOpenedSongs.push(targetSongIndex);
		}
		
		localStorage.setItem('alreadyOpenedSongsStorage', JSON.stringify(alreadyOpenedSongs));
		//console.log(alreadyOpenedSongs)
		
	}

	for(let i=0; i<listItem.length; i++){
		listItem[i].addEventListener("click", loadSong);
	}

	function moveBack(){
		if(state === "song"){
			state = "home";
			headerText.innerText = "Sve pesme";
		}
		listContainer.style.display = "flex";
		textContainer.style.display = "none";
		backButton.style.visibility="hidden";
	}

	backButton.addEventListener("click", moveBack);
	
	function openMenu(){
	//	listContainer.style.display = "none";
	//	textContainer.style.display = "none";
		//menuButton.style.display = "none";
		//closeButton.style.display = "block";
		menuContainer.style.display = "flex";
		//backButton.style.visibility = "hidden";
		//oldHeaderText = headerText.innerText;
		//headerText.innerText = "Meni";
	}
	
	menuButton.addEventListener("click", openMenu);

	function closeMenu(){
	//	listContainer.style.display = "none";
	//	textContainer.style.display = "none";
		//headerText.innerText = oldHeaderText;
		//menuButton.style.display = "block";
		//closeButton.style.display = "none";
		menuContainer.style.display = "none";
		//if(state !== "home") backButton.style.visibility = "visible";
	}
	
	closeButton.addEventListener("click", closeMenu);
	
	function resetFunction(){
		
		alreadyOpenedSongs = [];
		songListScrollSave = "empty";
		localStorage.clear();

		listContainer.innerHTML = ``;
		for(let i=0; i<listElements.length; i++){
			listContainer.innerHTML += 
			`<div style="background-color: ${listElements[i].songColor}" class="song-Id-${i.toString()} list-item">
				<h1>${listElements[i].songTitle}</h1>
				<h3>${listElements[i].songAuthor}</h3>
			</div>`;
			//  Stavi ZASTITU ZA BOJU
			//console.log("pozz")
		}
		
		listItem = document.querySelectorAll(".list-item");
		
	for(let i=0; i<listItem.length; i++){
		listItem[i].addEventListener("click", loadSong);
	}
		
		/*
		
		for(i=0; i < listContainer.childNodes.length; i++){
			listContainer.childNodes[i].style.backgroundColor = "";
		}
		
		*/
		
		
		closeMenu();
	}
	
	resetButton.addEventListener("dblclick", resetFunction);
		
	function openSearch(){
		closeMenu();
		searchContainer.style.display = "flex";
		inputTextSearch.value = "";
		inputTextSearch.focus();
	}

	searchButton.addEventListener("click", openSearch);
	
	function closeSearch(){
		inputTextSearch.value = "";
		searchContainer.style.display = "none";
		searchListContainer.innerHTML = ``;
	}
	
	closeSearchButton.addEventListener("click", closeSearch);


	function probica(ev){
		//let elementId = ev.target.id.split(" ");
		let elementId = ev.target.classList[0].split("-");
		loadSong("input", parseInt(elementId[2]));
		closeSearch();
	}///   POPRAVI OVO OKO ID a, ideja je umesto toga koristiti kenerisan id od strane programa


	function songSearch(){
		
		searchListContainer.innerHTML = ``;
		for(let i=0; i<listContainer.childNodes.length; i++){
			
			
			if ( listContainer.childNodes[i].children[0].innerText.toLowerCase().includes(inputTextSearch.value.toLowerCase()) ) {
			  //console.log("String sadrži tekst!");
			  
			//console.log(listContainer.childNodes[i].children[0].innerText);
			let clone = listContainer.childNodes[i].cloneNode(true);
			clone.classList.remove("list-item");
			clone.classList.add("search-list-item");
			//console.log(clone);
			searchListContainer.appendChild(clone);
			  
			} else {
			  
			}
			/*
			//console.log(listContainer.childNodes[i].children[0].innerText);
			let clone = listContainer.childNodes[i].cloneNode(true);
			clone.classList.remove("list-item");
			clone.classList.add("search-list-item");
			//console.log(clone);
			searchListContainer.appendChild(clone);
			*/
		}


		let searchListItem = document.querySelectorAll(".search-list-item");
		
		for(let i=0; i<searchListItem.length; i++){
			searchListItem[i].addEventListener("click", probica);
		}
		/*
		searchListContainer.innerHTML = ``;
		for(let i=0; i<listElements.length; i++){
			searchListContainer.innerHTML += 
			`<div class="song-Id-${i} search-list-item">
				<h1>${listElements[i].songTitle}</h1>
				<h3>${listElements[i].songAuthor}</h3>
			</div>`;
			
			//console.log("pozz")
		}
		
		let searchListItem = document.querySelectorAll(".search-list-item");
		
		for(let i=0; i<searchListItem.length; i++){
			searchListItem[i].addEventListener("click", probica);
		}
		*/
		
	}

	inputTextSearch.addEventListener("input", songSearch);


	function loadFromStorage(){
		
		let alreadyOpenedSongsTemp = localStorage.getItem("alreadyOpenedSongsStorage");
		
		if(!(alreadyOpenedSongsTemp === null)){
			alreadyOpenedSongs = JSON.parse(alreadyOpenedSongsTemp);
			
			for(let i = 0; i < alreadyOpenedSongs.length; i++){
				if(!(listContainer.childNodes[alreadyOpenedSongs[i]] === undefined)){
					listContainer.childNodes[alreadyOpenedSongs[i]].style.backgroundColor = OpenedSongColor;
					//  NAPRAVI KONSTANTU ZA BOJE
				}
			}
		}
		
		
		let songListScrollSaveTemp = localStorage.getItem("songListScrollSaveStorage");
		
		if(!(songListScrollSaveTemp === null)){
			songListScrollSave = parseInt(songListScrollSaveTemp);
			listContainer.scrollTop = songListScrollSave;
			//console.log(songListScrollSave);/////  ISPROVERAVAJ I UZDUZ I POPREKO i ugasi sve konzole
		}		
		
		
	}

	loadFromStorage();
	

//});

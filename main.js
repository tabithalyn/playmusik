let previous = document.querySelector('#prev');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let show_volume = document.querySelector('#show_volume');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_img = document.querySelector('#track_img');
let auto_play = document.querySelector('#auto');
let artist = document.querySelector('#artist');
let volume_icon = document.querySelector('#volume_icon');

let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');

//All songs list
let All_song = [
   {
     name: "Good Times Bad Times",
     path: "songs/Led Zeppelin - Good Times Bad Times.mp3",
     img: "img/LedZeppelin_cover.png",
     singer: "Led Zeppelin"
   },
   {
     name: "Jet Airliner",
     path: "songs/Steve Miller Band - Jet Airliner.mp3",
     img: "img/SteveMillerBand_Greatest-Hits.png",
     singer: "Steve Miller Band"
   },
   {
     name: "Fly By Night",
     path: "songs/Rush - Fly By Night.mp3",
     img: "img/Rush_Fly-By-Night.png",
     singer: "Rush"
   },
   {
     name: "Layla",
     path: "songs/Derek and the Dominos - Layla.mp3",
     img: "img/Layla_cover.png",
     singer: "Derek and the Dominos"
   },
   {
     name: "Renegade",
     path: "songs/Styx - Renegade.mp3",
     img: "img/Styx_Pieces-of-Eight.png",
     singer: "Styx"
   }
];

// generate tracklist
const ulTag = document.querySelector('ul');
for (let i = 0; i < All_song.length; i++) {
  let liTag = `<li li-index="${i + 1}">
                <span>${All_song[i].name}
                  <span class="singer">${All_song[i].singer}</span>
                </span>
              </li>`;
  ulTag.insertAdjacentHTML('beforeend', liTag);
}

// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_img.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(range_slider ,1000);
}

load_track(index_no);


//mute sound function
function muteSound(){
	track.volume = 0;
	volume.value = 0;
	show_volume.innerHTML = 0;
  volume_icon.innerHTML = '<i class="uil uil-volume-mute" id="volume_icon" onclick="muteSound()"></i>';
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="uil uil-pause"></i>';
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="uil uil-play"></i>';
}


// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function prevSong(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();
	} else{
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volumeChange(){
	show_volume.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
  volume_icon.innerHTML = '<i class="uil uil-volume" onclick="muteSound()"></i>';
}

// change slider position 
function changeDuration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplayToggle(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#458074";
	}
}


function range_slider(){
	let position = 0;

  // update slider position
  if(!isNaN(track.duration)){
  	position = track.currentTime * (100 / track.duration);
  	slider.value =  position;
  }

  // function will run when the song is over
  if(track.ended){
    play.innerHTML = '<i class="uil uil-play"></i>';
    if(autoplay==1){
		  index_no += 1;
		  load_track(index_no);
		  playsong();
    }
  }
}

// view track list
function viewTracks() {
let view = document.querySelector('.track_list');
  if (view.style.display === 'none') {
    view.style.display = 'block';
  } else {
  view.style.display = 'none';
  }
}

// toggle light/dark mode
function toggleMode() {
  let element = document.body;
  element.classList.toggle('dark_mode');
  let daynight = document.getElementById('day-night');
  if (daynight.innerHTML === 'Day <i class="uil uil-sun"></i>') {
    daynight.innerHTML = 'Night <i class="uil uil-moon"></i>';
  } else {
    daynight.innerHTML = 'Day <i class="uil uil-sun"></i>';
  }
}

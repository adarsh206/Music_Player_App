console.log("Welcome to Choice");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Marvel Studio's Black Widow Background Soudtrack", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "13 Venom (Music From the Motion Picture)", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "50 Cent - Ready For War HQ", filePath: "songs/3.mp3", coverPath: "covers/2.jpg"},
    {songName: "300 Violin Orchestra Fast Version", filePath: "songs/4.mp3", coverPath: "covers/3.jpg"},
    {songName: "Alan Walker - Fade  NCS Release", filePath: "songs/5.mp3", coverPath: "covers/4.jpg"},
    {songName: "Alec Benjamin - Let Me Down Slowly", filePath: "songs/6.mp3", coverPath: "covers/2.jpg"},
    {songName: "All the way up", filePath: "songs/7.mp3", coverPath: "covers/6.jpg"},
    {songName: "Last of the Mohicans (Cengiz Han Remix)", filePath: "songs/8.mp3", coverPath: "covers/7.jpg"},
    {songName: "Thor_Ragnarok_Main_Theme_Song", filePath: "songs/9.mp3", coverPath: "covers/8.jpg"},
    {songName: "Clean_Bandit - Rockabye_ft._Sean_Paul_Anne-Marie", filePath: "songs/10.mp3", coverPath: "covers/3.jpg"},
    
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
});


// audioElement.play();
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;

}) 

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = 'songs/{${songIndex+1}}.mp3';
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = 'songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = 'songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
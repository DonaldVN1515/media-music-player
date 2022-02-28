/**
 * 1. RENDER SONGS
 * 2. SCROLL TOP
 * 3. PLAY, PAUSE, SEEK
 * 4. CD ROTATE
 * 5. NEXT / PREV
 * 6. RANDOM
 * 7 NEXT / REPEAT WHEN ENDED
 * 8 ACITVE SONG
 * 9. SCROLL ACTIVE SONG INTO VIEW
 * 10 PLAY SONG WHEN CLICK
 */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'DONALDVN_PLAYER';

const playlist = $('.js-playlist');
const songName = $('.dashboard__song h3');
const songImg = $('.dashboard__song img');
const playBtn = $('.js-play');
const playerBtn = $('.js-player');
const nextBtn = $('.js-next');
const prevBtn = $('.js-prev');
const repeatBtn = $('.js-repeat');
const randomBtn = $('.js-random ');
const durationTime = $('.js-duration ');
const remainingTime = $('.js-remaining ');

const audio = $('#audio');
const progress = $('#progress');

const app = {
	isPlaying: false,
	isRandom: false,
	isRepeat: false,
	config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
	setConfig: function (key, value) {
		this.config[key] = value;
		localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
	},
	currentIndex: 0,
	songs: [
		{
			name: 'Bài ca tuổi trẻ',
			singer: 'DonaldVN',
			path: './assets/music/Bai-Ca-Tuoi-Tre-DJ-Minh-Tri-Remix-DJ-Minh-Tri.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'Bánh mì Không',
			singer: 'Đạt G - Phương Uyên',
			path: './assets/music/Banh-Mi-Khong-Dat-G-DuUyen.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'Có anh ở đây rồi',
			singer: 'DonaldVN',
			path: './assets/music/Co-Anh-O-Day-Roi-Dj-Thanh-Nguyen-ft-Anh-Chau-Remix-Anh-Quan-Idol.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'Dường như thói quen',
			singer: 'DonaldVN',
			path: './assets/music/Dung-Nhu-Thoi-Quen-JayKii-Sara-Luu.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'Em ổn không?',
			singer: 'DonaldVN',
			path: './assets/music/Em-On-Khong-Trinh-Thien-An-ViruSs.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'End of time',
			singer: 'DonaldVN',
			path: './assets/music/End-Of-Time-K-391-Alan-Walker-Ahrix.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'How do you like that',
			singer: 'DonaldVN',
			path: './assets/music/HowYouLikeThat-BLACKPINK-6720100.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'I lose myself',
			singer: 'DonaldVN',
			path: './assets/music/If-I-Lose-Myself-Madilyn-Bailey.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'Lemon tree',
			singer: 'DonaldVN',
			path: './assets/music/Lemon+Tree.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'Memories',
			singer: 'DonaldVN',
			path: './assets/music/Memories-Maroon5-6091839.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'My love',
			singer: 'DonaldVN',
			path: './assets/music/My Love - Westlife.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'Unfollow',
			singer: 'DonaldVN',
			path: './assets/music/Unfollow-Tua-Freaky-CM1X.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'Vợ tuyệt vời nhất',
			singer: 'DonaldVN',
			path: './assets/music/Vo-Tuyet-Voi-Nhat-Vu-Duy-Khanh.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'Yêu rồi',
			singer: 'DonaldVN',
			path: './assets/music/Yeu-Roi-Gao-Nep-Gao-Te-OST-Tino.mp3',
			img: './assets/img/LogoV.png',
		},
		{
			name: 'You are my everything',
			singer: 'DonaldVN',
			path: './assets/music/You Are My Everything - Billkin.mp3',
			img: './assets/img/LogoV.png',
		},
	],
	render: function () {
		const htmls = this.songs.map((song, index) => {
			return `<li class="playlist__song ${
				index === this.currentIndex ? 'active' : ''
			}" data-index="${index}">
                        <div class="playlist__infor">
                        <img src="${song.img}" alt="" />
                            <div class="playlist__name">
                                <h4>${song.name}</h4>
                                <h6>${song.singer}</h6>
                            </div>
                        </div>
                        <i class="fas fa-ellipsis-h option"></i>
                    </li>`;
		});
		playlist.innerHTML = htmls.join('');
	},
	defineProperties: function () {
		Object.defineProperty(this, 'currentSong', {
			get: function () {
				return this.songs[this.currentIndex];
			},
		});
	},
	handleEvents: function () {
		const _this = this;
		const songImgAnimate = songImg.animate(
			[{ transform: 'rotate(360deg)' }],
			{
				duration: 20000,
				iterations: Infinity,
			}
		);
		songImgAnimate.pause();
		playerBtn.onclick = function () {
			if (_this.isPlaying) {
				audio.pause();
			} else {
				audio.play();
			}
		};
		audio.onplay = function () {
			_this.isPlaying = true;
			playerBtn.classList.add('js-playing');
			songImgAnimate.play();
		};
		audio.onpause = function () {
			_this.isPlaying = false;
			playerBtn.classList.remove('js-playing');
			songImgAnimate.pause();
		};
		audio.ontimeupdate = function () {
			if (audio.duration) {
				const progressPercent = Math.floor(
					(audio.currentTime / audio.duration) * 100
				);
				progress.value = progressPercent;
			}
		};

		audio.onended = function () {
			if (_this.isRepeat) {
				audio.play();
			} else {
				nextBtn.click();
			}
		};

		progress.onchange = function (e) {
			const seekTime = (audio.duration / 100) * e.target.value;
			audio.currentTime = seekTime;
		};
		nextBtn.onclick = function () {
			if (_this.isRandom) {
				_this.randomSong();
			} else {
				_this.nextSong();
			}
			audio.play();
			_this.render();
			_this.scrollToActiveSong();
		};
		prevBtn.onclick = function () {
			if (_this.isRandom) {
				_this.randomSong();
			} else {
				_this.prevSong();
			}
			audio.play();
			_this.render();
			_this.scrollToActiveSong();
		};
		randomBtn.onclick = function () {
			_this.isRandom = !_this.isRandom;
			_this.setConfig('isRandom', _this.isRandom);
			randomBtn.classList.toggle('active', _this.isRandom);
		};
		repeatBtn.onclick = function () {
			_this.isRepeat = !_this.isRepeat;
			_this.setConfig('isRepeat', _this.isRepeat);
			repeatBtn.classList.toggle('active', _this.isRepeat);
		};
		playlist.onclick = function (e) {
			const songNode = e.target.closest(
				'.playlist__song:not(#main__playlist .active)'
			);

			if (
				e.target.closest('.playlist__song:not(.active)') ||
				!e.target.closest('.option')
			) {
				if (songNode) {
					_this.currentIndex = Number(songNode.dataset.index);
					_this.loadCurrentSong();
					_this.render();
					audio.play();
				}
				if (!e.target.closest('.option')) {
				}
			}
		};
	},
	loadCurrentSong: function () {
		songName.textContent = this.currentSong.name;
		songImg.src = this.currentSong.img;
		audio.src = this.currentSong.path;

		// console.log(songImg, songName, audio);
	},
	nextSong: function () {
		this.currentIndex++;
		if (this.currentIndex >= this.songs.length) {
			this.currentIndex = 0;
		}
		this.loadCurrentSong();
	},
	prevSong: function () {
		this.currentIndex--;
		if (this.currentIndex < 0) {
			this.currentIndex = this.songs.length - 1;
		}
		this.loadCurrentSong();
	},
	randomSong: function () {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * this.songs.length);
		} while (newIndex === this.currentIndex);

		// console.log(newIndex);

		this.currentIndex = newIndex;
		this.loadCurrentSong();
	},
	scrollToActiveSong: function () {
		setTimeout(() => {
			$('#main__playlist .active').scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}, 200);
	},
	loadConfig: function () {
		this.isRandom = this.config.isRandom;
		this.isRepeat = this.config.isRepeat;

		// Object.assign(this, this.config);
	},
	displayTime: function () {
		const { duration, currentTime } = audio;

		function formatTimer(number) {
			const minutes = Math.floor(number / 60);
			const seconds = Math.floor(number - minutes * 60);

			return `${minutes < 10 ? '0' + minutes : minutes}:${
				seconds < 10 ? '0' + seconds : seconds
			}`;
		}

		durationTime.textContent = formatTimer(currentTime);

		if (!duration) {
			remainingTime.textContent = '00:00';
		} else {
			remainingTime.textContent = formatTimer(duration);
		}

		const timer = setInterval(this.displayTime, 100);
	},
	start: function () {
		this.loadConfig;

		this.defineProperties();

		this.displayTime();

		this.handleEvents();

		this.loadCurrentSong();

		this.render();

		randomBtn.classList.toggle('active', this.isRandom);
	},
};

app.start();

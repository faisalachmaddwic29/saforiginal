import { defineStore } from 'pinia';

type PrayTime = {
	name: string;
	time: string;
	image: string;
};



export const useBannerPraysStore = defineStore('bannerPrays', {
	state: () => ({
		currentIndex: 0,
		currentPrayer: '', // Nama waktu salat aktif
		currentTime: '00:00',
		currentDate: '',
		currentDayJava: '',
		currentDayIslamic: '',
		currentTimezone: 'WIB',
		prayerTimes: [] as PrayTime[],
	}),
	persist: {
		enabled: import.meta.client, // Hanya aktifkan di client
	},
	actions: {
		/**
		 * Deteksi zona waktu perangkat dan konversi ke WIB, WITA, atau WIT.
		 */
		detectTimezone() {
			if (!import.meta.client) return 'WIB'; // Default fallback WIB jika di server

			// Mendapatkan offset dalam menit
			const offsetMinutes = new Date().getTimezoneOffset();
			const timezoneMap: Record<string, string> = {
				'-420': 'WIB', // UTC+7
				'-480': 'WITA', // UTC+8
				'-540': 'WIT', // UTC+9
			};
			this.currentTimezone = timezoneMap[String(offsetMinutes)] || 'WIB';
			return this.currentTimezone;
		},
		getIslamicDay(date: Date): { day: string; arabic: string } {
			const islamicDays = [
				{ day: "Ahad", arabic: "الأحد" },
				{ day: "Senin", arabic: "الإثنين" },
				{ day: "Selasa", arabic: "الثلاثاء" },
				{ day: "Rabu", arabic: "الأربعاء" },
				{ day: "Kamis", arabic: "الخميس" },
				{ day: "Jumat", arabic: "الجمعة" },
				{ day: "Sabtu", arabic: "السبت" },
			];

			const dayIndex = date.getDay(); // 0 = Sunday, 6 = Saturday
			return islamicDays[dayIndex];
		},
		/**
		 * Menghitung hari Jawa berdasarkan tanggal.
		 */
		getJavaDay(date: Date): string {
			const pasaran = ["Pon", "Wage", "Kliwon", "Legi", "Pahing"];

			const k = date.getDate();
			let m = date.getMonth() + 1;
			let Y = date.getFullYear();

			// Sesuaikan m dan Y untuk Jan/Feb
			if (m < 3) {
				m += 12;
				Y -= 1;
			}

			const C = Math.floor(Y / 100);
			const y = Y % 100;

			const term1 = k;
			const term2 = Math.floor((3 * (m + 1)) / 5);
			const term3 = Math.floor(y / 4);
			const term4 = 4 * C;
			const term5 = -4 * Math.floor(C / 4);

			const P = (term1 + term2 + term3 + term4 + term5) % 5;
			const idx = (P + 5) % 5; // pastikan positif

			return pasaran[idx];

		},

		/**
		 * Mengembalikan waktu sesuai zona waktu tertentu.
		 */
		getTimeWithTimezone(timezone: string): Date {
			const timezoneOffsets: Record<string, number> = {
				WIB: 7,
				WITA: 8,
				WIT: 9,
			};
			const offset = timezoneOffsets[timezone] || 7; // Default WIB
			const nowUTC = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
			return new Date(nowUTC + offset * 3600000);
		},
		/**
		 * Memulai perhitungan waktu salat.
		 */
		startClock() {
			setInterval(() => {
				// Format waktu dan set state

				const timezone = this.detectTimezone();
				const now = this.getTimeWithTimezone(timezone);

				// without minutes
				this.currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
				// with minutes
				// this.currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} ${timezone}`;

				this.currentDate = now.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
				this.currentDayJava = this.getJavaDay(now);
				this.currentDayIslamic = this.getIslamicDay(now);

				this.calculateCurrentIndex();

			}, 1000);
		},
		/**
		 * Hitung indeks waktu salat saat ini berdasarkan waktu sekarang.
		 */
		calculateCurrentIndex(): void {
			if (!import.meta.client) return;


			const timezone = this.detectTimezone();
			const now = this.getTimeWithTimezone(timezone);
			const nowMinutes = now.getHours() * 60 + now.getMinutes();

			// Ambil waktu-waktu salat dalam satuan menit
			const timesInMinutes = this.prayerTimes.map(p => {
				const [h, m] = p.time.split(':').map(Number);
				return h * 60 + m;
			});

			const minTime = Math.min(...timesInMinutes); // misalnya Subuh
			const maxTime = Math.max(...timesInMinutes); // misalnya Isya

			// Normalisasi waktu salat
			const normalizedPrayerTimes = this.prayerTimes.map((prayer, index) => {
				const [hour, minute] = prayer.time.split(':').map(Number);
				const normalizedTime = new Date(now);
				const prayerMinutes = hour * 60 + minute;

				normalizedTime.setHours(hour, minute, 0, 0);

				const nextPrayer = this.prayerTimes[(index + 1) % this.prayerTimes.length];
				const [nextHour, nextMinute] = nextPrayer.time.split(':').map(Number);
				const nextNormalizedTime = new Date(now);
				nextNormalizedTime.setHours(nextHour, nextMinute, 0, 0);

				if (normalizedTime < now && now < nextNormalizedTime) {
					// Tetap hari ini, tidak perlu ditambah
				} else if (normalizedTime < now) {

					if (!(prayerMinutes === maxTime && (nowMinutes >= maxTime || nowMinutes < minTime))) {
						normalizedTime.setDate(normalizedTime.getDate() + 1); // Tambah 1 hari
					}
				}

				return { ...prayer, normalizedTime };
			});

			// Urutkan waktu salat
			normalizedPrayerTimes.sort((a, b) => a.normalizedTime.getTime() - b.normalizedTime.getTime());


			// console.log('Now:', now);
			// console.log('Normalized Prayer Times:', normalizedPrayerTimes.map(p => ({
			// 	name: p.name,
			// 	time: p.normalizedTime.toString(),
			// })));
			// console.log('Selected Index:', this.currentIndex);

			// Set prayerTimes kembali ke state
			this.prayerTimes = normalizedPrayerTimes;

			// Tentukan salat aktif saat ini berdasarkan waktu sekarang
			const activeIndex = normalizedPrayerTimes.findIndex((prayer, index) => {
				const next = normalizedPrayerTimes[(index + 1) % normalizedPrayerTimes.length];
				return now >= prayer.normalizedTime && now < next.normalizedTime;
			});

			this.currentIndex = activeIndex !== -1 ? activeIndex : normalizedPrayerTimes.length - 1;
			this.currentPrayer = this.prayerTimes[this.currentIndex]?.name || '';


			// Debug log
			// console.log(Selected Index: ${this.currentIndex} (${this.prayerTimes[this.currentIndex]?.name || 'None'}));
		},
		fetchLocationUser() {
			return new Promise((resolve, reject) => {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(
						(position) => {
							const { latitude, longitude } = position.coords;
							resolve({ latitude, longitude });
						},
						(error) => {
							reject(`Geolocation error: ${error.message}`);
						}
					);
				} else {
					reject('Geolocation not supported');
				}
			});
		},
		setPrayerTimes(prayerTimes: PrayTime[]) {
			this.prayerTimes = prayerTimes;
			this.calculateCurrentIndex();
			this.startClock();
		},
	},
})

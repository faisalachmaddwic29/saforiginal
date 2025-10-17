export const useTimeStore = defineStore("time", {
	state: () => ({
		currentTimezone: 'WIB',
		currentTime: '00:00:00',
	}),

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

		reset() {
			this.currentTimezone = 'WIB';
			this.currentTime = '00:00:00';
		},
	},
});
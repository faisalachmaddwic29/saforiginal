import type { User } from "./user"


export interface TypeAuthToken {
	access_token: string
	token_refresh?: string
	token_type: string
	expires_in: number,
	user?: User
}

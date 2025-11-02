import type { PaginateData } from "./base";

export interface Video {
  id: number;
  title: string;
  description: string | null;
  excerpt: string | null;
  url: string;
  media_type: string;
  availability_type: string;
  available_at: string | null;
  order_index: number;
};


export type VideosResponse = PaginateData<Video, 'streamings'> & {
	message: string;
	status: number;
};

export type VideoResponse = {
	streaming: Video
	message: string;
	status: number;
};
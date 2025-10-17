export interface Banner {
  id: number;
  file_name: string;
  file_path: string;
  publish: boolean;
  time_to_show: string; // Format "HH:mm:ss"
}

export type Banners = Banner[];

export interface BannerResponse {
  popups: Banner[] | [];
}

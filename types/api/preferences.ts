export interface PreferenceItem {
  id: number;
  name: string;
  slug: string;
  type: string | null;
  order_column: number;
}

export type Preferences = PreferenceItem[];

export type PreferencesResponse = {
  preferences: Preferences
  message: string;
  status: number;
};

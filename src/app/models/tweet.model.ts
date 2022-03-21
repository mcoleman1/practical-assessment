export interface Tweet {
  createdAt: Date;
  id: string;
  source: string;
  text: string;
  is_newest?: boolean;
  is_oldest?: boolean;
}

export class Bookmark {
  id: number;
  title: string;
  url: string;
  description?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Bookmark>) {
    Object.assign(this, partial);
  }
}

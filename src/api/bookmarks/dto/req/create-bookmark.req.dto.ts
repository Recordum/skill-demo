export class CreateBookmarkReqDto {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
}

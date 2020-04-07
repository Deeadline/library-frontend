import {CommentInterface} from "./comment.interface";

export interface BookInterface {
  id: number;
  title: string;
  isbn: string;
  author: string;
  publishingHouse: string;
  releaseDate: string;
  isLoaned: boolean;
  categoryIds: number[];
  comments: CommentInterface[];
}

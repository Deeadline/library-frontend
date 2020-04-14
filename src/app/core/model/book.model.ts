import {CategoryModel} from "./category.model";
import {CommentInterface} from "../../api/model/comment.interface";

export interface BookModel {
  id: number;
  title: string;
  isbn: string;
  author: string;
  publishingHouse: string;
  releaseDate: string;
  loaned: boolean;
  categories: CategoryModel[];
  comments: CommentInterface[];
}

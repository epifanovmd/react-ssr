import { iocDecorator, ListCollectionHolder } from "@force-dev/utils";

import { PostModel } from "../../models";
import { IPost, IPostSearchRequest, IPostsRequest } from "../../service";
import { PrefetchStore } from "../types";

export const IPostsDataStore = iocDecorator<IPostsDataStore>();

export interface IPostsDataStore extends PrefetchStore<IPost[]> {
  holder: ListCollectionHolder<IPost>;

  data: IPost[];
  models: PostModel[];

  error?: string;
  loading: boolean;
  loaded: boolean;

  onSearch(args: IPostSearchRequest): Promise<IPost[]>;

  onRefresh(args?: IPostsRequest): Promise<IPost[]>;

  onLoadMore(args?: IPostsRequest): Promise<IPost[]>;
}

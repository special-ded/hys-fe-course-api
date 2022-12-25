import { ListQueryParamsDto } from "../dto/list-query-params.dto";

export abstract class BaseControllerService {
  public static async getAll<T>(
    model,
    query: ListQueryParamsDto,
  ): Promise<T[]> {
    const
      limit = query && query.limit || 200,
      sort = query && query.sort || 'createdAt',
      page = query && query.page || 1,
      filter = query && query.filter || '';

    const [filterKey, filterProp] = filter && filter.split(';');
    return model
      .find(filterKey && filterProp ? {
        [filterKey]: filterProp
      } : {} )
      .limit(limit)
      .sort(sort)
      .skip((page - 1) * limit)
      .exec();
  }
}
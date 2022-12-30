import { ListQueryParamsDto } from "../dto/list-query-params.dto";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { HttpStatus } from "@nestjs/common";
import { Model, Query } from "mongoose";
import * as bcrypt from "bcrypt";

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

  public static validateNoEntity(
    model: Query<any, any, any, any>,
    modelName: string = 'Entity'
  ): Promise<any> {
  return model.then((user) => {
      if (user) {
        return user;
      }

      throw new HttpException(
        `No ${modelName} with provided ID was found`,
        HttpStatus.NOT_FOUND
      );
    })
  }

  public static async hashPWD(password: string): Promise<string> {
    return  await bcrypt.hash(password, 10);
  }

  public static async validateAdmin(
    id: string,
    model: Model<any>,
    query: Promise<any>
  ): Promise<any> {
    const user = await model.findById(id);

    if(user && user.username === 'admin') {
      return new HttpException(
        'This entity cannot be changed',
        HttpStatus.FORBIDDEN
      );
    }

    return query;
  }
}
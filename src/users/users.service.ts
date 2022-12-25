import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./shemas/users.schema";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { BaseControllerService } from "../core/base/base-controller.service";
import { Order } from "../order/schemas/order.schema";
import { ListQueryParamsDto } from "../core/dto/list-query-params.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>
  ) {}

  public async getAll(
    query: ListQueryParamsDto
  ): Promise<User[]> {
    return BaseControllerService.getAll<User>(this.model, query);
  }

  public async findOne(username: string): Promise<User | undefined> {
    return this.model.findOne({ username }).exec();
  }

  public async getById(id: string | number): Promise<User> {
    return this.model.findById(id);
  }

  public async create(body: CreateUserDto): Promise<User | HttpException> {
    try {
      const hashedPass = await bcrypt.hash(body.password, 10);

      return await new this.model({
        ...body,
        password: hashedPass
      }).save();
    } catch ({ code }) {
      if(code === 11000) {
        throw new ConflictException('User with such name already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  public async remove(id: string | number): Promise<User> {
    return this.model.findByIdAndRemove(id);
  }

  public async update(
    id: string | number,
    body: UpdateUserDto
  ): Promise<User> {
    return this.model.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );
  }
}

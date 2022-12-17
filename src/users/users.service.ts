import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./shemas/users.schema";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { log } from "util";

@Injectable()
export class UsersService {
  // private readonly users: User[] = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];
  //
  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find((user: User): boolean => user.username === username);
  // }

  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>
  ) {}

  public async getAll(): Promise<User[]> {
    return this.model.find().exec();
  }

  public async findOne(username: string): Promise<User | undefined> {
    return this.model.findOne({ username }).exec();
  }

  public async getById(id: string | number): Promise<User> {
    return this.model.findById(id);
  }

  public async create(body: CreateUserDto): Promise<User> {
    return new this.model(body).save();
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

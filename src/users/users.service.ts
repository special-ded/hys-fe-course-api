import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./shemas/users.schema";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
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
    const hashedPass = await bcrypt.hash(body.password, 10);

    return new this.model({
      ...body,
      password: hashedPass
    }).save();
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

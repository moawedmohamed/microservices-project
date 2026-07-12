import { User } from "./user.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from './user.schema'
import { Model } from "mongoose";

type InputTypes = {
    clerkUserId: string;
    name: string;
    email: string;
};
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) { }

    async upsertAuthUser(input: InputTypes) {
        const now = new Date();
        return this.userModel.findOneAndUpdate(
            {
                clerkUserId: input.clerkUserId
            },
            {
                $set: {
                    email: input.email,
                    name: input.name,
                    lastSeenAt: now
                },
                $setOnInsert: {
                    role: "user"
                }
            },
            {
                returnDocument: 'after',
                upsert: true,
                setDefaultsOnInsert: true
            }
        )
    }
    async findByClerkUserId(clerkUserOd: string) {
        return this.userModel.findOne({ clerkUserOd })
    }
}

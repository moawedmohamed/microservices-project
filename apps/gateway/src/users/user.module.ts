import { User } from "./user.schema";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.schema";
import { UsersService } from "./users.service";

@Module({
    imports: [
        // * register the User Model fop Dependency Injection
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [UsersService],
    exports: [UsersService]
})

export class UserModule { };

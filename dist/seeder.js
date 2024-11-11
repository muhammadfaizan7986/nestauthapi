"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_seeder_1 = require("nestjs-seeder");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./modules/user/entities/user.entity");
const collections_1 = require("./constants/collections");
const user_seeder_1 = require("./modules/user/user.seeder.");
(0, nestjs_seeder_1.seeder)({
    imports: [
        mongoose_1.MongooseModule.forRoot("mongodb+srv://fantasyshowdown:HyDzrh2hLag6vSCI@prim.g59i2.mongodb.net/local_db"),
        mongoose_1.MongooseModule.forFeature([
            { name: collections_1.DB_COLLECTIONS.USERS, schema: user_entity_1.UserSchema },
        ]),
    ],
}).run([
    user_seeder_1.UserSeeder,
]);
//# sourceMappingURL=seeder.js.map
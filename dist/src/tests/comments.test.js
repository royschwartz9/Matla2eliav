"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
const posts_model_1 = __importDefault(require("../models/posts_model"));
const comments_model_1 = __importDefault(require("../models/comments_model"));
let app;
let postId;
let commentId;
const testUser = {
    email: "test@user.com",
    password: "testpassword",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("beforeAll");
    app = yield (0, server_1.default)();
    yield comments_model_1.default.deleteMany();
    yield posts_model_1.default.deleteMany();
    yield (0, supertest_1.default)(app).post("/auth/register").send(testUser);
    const res = yield (0, supertest_1.default)(app).post("/auth/login").send(testUser);
    testUser.token = res.body.accessToken;
    testUser._id = res.body._id;
    expect(testUser.token).toBeDefined();
    const postResponse = yield (0, supertest_1.default)(app).post("/posts")
        .set({ authorization: "JWT " + testUser.token })
        .send({
        title: "Test Post",
        content: "Test Content",
        Sender: "TestOwner",
    });
    postId = postResponse.body._id;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("afterAll");
    yield mongoose_1.default.connection.close();
}));
describe("Comments Tests", () => {
    test("Comments test get all", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/comments");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    }));
    test("Test Create Comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/comments")
            .set({ authorization: "JWT " + testUser.token })
            .send({
            postId,
            content: "Test Comment",
            Sender: "TestOwner",
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.content).toBe("Test Comment");
        expect(response.body.Sender).toBe("TestOwner");
        commentId = response.body._id;
    }));
    test("Test Get All Comments", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/comments");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].content).toBe("Test Comment");
        expect(response.body[0].Sender).toBe("TestOwner");
    }));
    test("Test Get Comment By ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(`/comments/commentid/${commentId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.content).toBe("Test Comment");
        expect(response.body.Sender).toBe("TestOwner");
    }));
    test("Test Get Comments By Post ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(`/comments/${postId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].content).toBe("Test Comment");
        expect(response.body[0].Sender).toBe("TestOwner");
    }));
    test("Test Update Comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).put(`/comments/${commentId}`)
            .set({ authorization: "JWT " + testUser.token })
            .send({
            content: "Updated Test Comment",
            Sender: "UpdatedTestOwner",
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.content).toBe("Updated Test Comment");
        expect(response.body.Sender).toBe("UpdatedTestOwner");
    }));
    test("Test Delete Comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete(`/comments/${commentId}`)
            .set({ authorization: "JWT " + testUser.token });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Comment deleted successfully");
    }));
});
//# sourceMappingURL=comments.test.js.map
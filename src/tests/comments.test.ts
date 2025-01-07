import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postModel from "../models/posts_model";
import commentModel from "../models/comments_model";
import { Express } from "express";
import userModel, { IUser } from "../models/users_model";

let app: Express;
let postId: string;
let commentId: string;

type User = IUser & { token?: string };
const testUser: User = {
  email: "test@user.com",
  password: "testpassword",
}

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await commentModel.deleteMany();
  await postModel.deleteMany();

  await request(app).post("/auth/register").send(testUser);
  const res = await request(app).post("/auth/login").send(testUser);
  testUser.token = res.body.accessToken;
  testUser._id = res.body._id;
  expect(testUser.token).toBeDefined();
  
  const postResponse = await request(app).post("/posts")
  .set({ authorization: "JWT " + testUser.token })
  .send({
    title: "Test Post",
    content: "Test Content",
    Sender: "TestOwner",
  });
  postId = postResponse.body._id;
});

afterAll(async () => {
  console.log("afterAll");
  await mongoose.connection.close();
});

describe("Comments Tests", () => {
  test("Comments test get all", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create Comment", async () => {
    const response = await request(app).post("/comments")
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
  });

  test("Test Get All Comments", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].content).toBe("Test Comment");
    expect(response.body[0].Sender).toBe("TestOwner");
  });

  test("Test Get Comment By ID", async () => {
    const response = await request(app).get(`/comments/commentid/${commentId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe("Test Comment");
    expect(response.body.Sender).toBe("TestOwner");
  });

  test("Test Get Comments By Post ID", async () => {
    const response = await request(app).get(`/comments/${postId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].content).toBe("Test Comment");
    expect(response.body[0].Sender).toBe("TestOwner");
  });

  test("Test Update Comment", async () => {
    const response = await request(app).put(`/comments/${commentId}`)
    .set({ authorization: "JWT " + testUser.token })
    .send({
      content: "Updated Test Comment",
      Sender: "UpdatedTestOwner",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe("Updated Test Comment");
    expect(response.body.Sender).toBe("UpdatedTestOwner");
  });

  test("Test Delete Comment", async () => {
    const response = await request(app).delete(`/comments/${commentId}`)
    .set({ authorization: "JWT " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Comment deleted successfully");
  });
});
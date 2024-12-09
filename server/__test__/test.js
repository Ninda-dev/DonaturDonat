const {
  beforeAll,
  afterAll,
  expect,
  describe,
  test,
} = require("@jest/globals");
const { User, sequelize } = require("../models");
const request = require("supertest");
const app = require("../app");
const { restart } = require("nodemon");
const { hashPass } = require("../helpers/hash");
const { INTEGER } = require("sequelize");

beforeAll(async () => {
  try {
    await User.destroy({
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
    const data = require("../data/user.json").map((e) => {
      e.password = hashPass(e.password);
      e.createdAt = e.updatedAt = new Date();
      return e;
    });

    await sequelize.queryInterface.bulkInsert("Users", data, {});
  } catch (error) {
    console.log(error, "beforeALl");
  }
});

test("POST/login succes", async () => {
  const res = await request(app).post("/login").send({
    email: "admin@mail.com",
    password: "admin",
  });
  console.log(res.status, res.body);
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("acces_token", expect.any(String));
});

describe("POST /login failed", () => {
  test("Email/Password Invalid", async () => {
    const res = await request(app).post("/login").send({
      email: "adminsalah@mail.com",
      password: "admin",
    });
    console.log(res.status, res.body);
    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty("message", "invalid email/password")
  });

  test("Email/Password Invalid", async () => {
    const res = await request(app).post("/login").send({
      email: "",
      password: "admin",
    });
    console.log(res.status, res.body);
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty("message", "Email is required")
  });

  test("Email/Password Invalid", async () => {
    const res = await request(app).post("/login").send({
      email: "hahaha@mail.com",
      password: "",
    });
    console.log(res.status, res.body);
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty("message", "Password is required")
  });

});

test("POST/register", async () => {
  const res = await request(app).post("/register").send({
    email: "adminnewnewnew@mail.com",
    password: "adminadmin",
  });
  console.log(res.status, res.body);
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty("email", expect.any(String))
  expect(res.body).toHaveProperty("id", expect.any(Number))
})

describe("Register failed", () => {

  test("Email/Password Invalid", async () => {
    const res = await request(app).post("/register").send({
      email: "",
      password: "wrongwrong",
    });
    console.log(res.status, res.body);
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty("message", "email is required")
  });

  test("Email/Password Invalid", async () => {
    const res = await request(app).post("/register").send({
      email: "ketawa@aja.com",

    });
    console.log(res.status, res.body);
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty("message", "password is required")
  });

});
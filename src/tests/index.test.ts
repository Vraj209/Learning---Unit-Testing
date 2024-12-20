import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "../index";
import { db } from "../__mocks__/db";

// Senario 1

// vi.mock("../db", () => ({
//   db: {
//     sum: {
//       create: vi.fn()
//     }
//   }
// }));

// Senario 2 Deep mocked
vi.mock("../db");

describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    db.sum.create.mockResolvedValue({
      id: 1,
      a: 1,
      b: 2,
      result: 3,
    });

    // for input validation test
    vi.spyOn(db.sum, "create");

    // before testing the what type of return and spy on the value and mock the request
    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    expect(db.sum.create).toHaveBeenCalledWith({
      data:{
        a:1,
        b:2,
        result:3
      }
    })
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it("should return 411 if no inputs are provided", async () => {
    const res = await request(app).post("/sum").send({});
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("Incorrect inputs");
  });
});

describe("GET /sum", () => {
  it("should return the sum of two numbers", async () => {
    const res = await request(app)
      .get("/sum")
      .set({
        a: "1",
        b: "2",
      })
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it("should return 411 if no inputs are provided", async () => {
    const res = await request(app).get("/sum").send();
    expect(res.statusCode).toBe(411);
  });
});

const request = require("supertest");
const app = require("./app");

describe("Todo API", () => {
  it("GET /todo --> array todos", () => {
    return request(app)
      .get("/todos")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });

  it("GET /todo/id --> specific todo by id", () => {
    return request(app)
      .get("/todos/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
  });

  it("GET /todo/id --> 404 if not found", () => {
    return request(app).get("/todos/999999").expect(404);
  });

  it("POST /todo --> create todo", () => {
    return request(app)
      .post("/todos")
      .send({
        name: "do dishes",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: "do dishes",
            completed: false,
          })
        );
      });
  });

  it("GET /todos --validates request body", () => {
    return request(app).post("/todos").send({ name: 123 }).expect(422);
  });
});

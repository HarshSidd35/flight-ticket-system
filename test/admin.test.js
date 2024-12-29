describe("Admin APIs", () => {
    it("should retrieve customers for a specific flight", async () => {
      const flightId = "67705f7e51b68b9075d31ac5"; // Replace with valid flight ID
      const res = await request(app)
        .get(`/api/admin/customers/${flightId}`)
        .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NmZlMGE1YWIxY2RlZGI2MDRlNjUzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTczNTQyMTUwOSwiZXhwIjoxNzM1NDI1MTA5fQ.T0QKJyJxsmVz7rGAhb6EokI_HEmCg13CXrKA6WU3O_8`); // Replace with valid admin token
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
  
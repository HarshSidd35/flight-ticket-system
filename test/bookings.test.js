describe("Booking APIs", () => {
    it("should create a new booking", async () => {
      const res = await request(app).post("/api/bookings").send({
        flightId: "67705f7e51b68b9075d31ac5", // Replace with valid flight ID
        passengers: [
          { name: "John Doe", age: 30, gender: "Male" },
          { name: "Jane Doe", age: 28, gender: "Female" },
        ],
      });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");
    });
  
    it("should retrieve bookings for a user", async () => {
      const userId = "676fe0a5ab1cdedb604e6546"; // Replace with valid user ID
      const res = await request(app).get(`/api/bookings/${userId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
  
describe("Flight APIs", () => {
    it("should search flights", async () => {
      const res = await request(app).get("/api/flights").query({
        source: "New York",
        destination: "Los Angeles",
        travelDate: "2024-12-30",
      });
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  
    it("should get flight details by ID", async () => {
      const flightId = "67705f7e51b68b9075d31ac5"; // Replace with valid ID from your DB
      const res = await request(app).get(`/api/flights/${flightId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("_id", flightId);
    });
  });
  
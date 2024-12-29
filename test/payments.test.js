describe("Payment APIs", () => {
    it("should initiate a payment", async () => {
      const res = await request(app).post("/api/payments").send({
        bookingId: "64b8509cad87f9fcb813bdef", // Replace with valid booking ID
        amount: 200,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status", "PENDING");
    });
  
    it("should handle payment callback", async () => {
      const res = await request(app).post("/api/payments/callback").send({
        bookingId: "64b8509cad87f9fcb813bdef", // Replace with valid booking ID
        status: "SUCCESS",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "Payment updated successfully");
    });
  });
  
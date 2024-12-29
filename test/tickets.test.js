describe("Ticket APIs", () => {
    it("should retrieve ticket details", async () => {
      const bookingId = "64b8509cad87f9fcb813bdef"; // Replace with valid booking ID
      const res = await request(app).get(`/api/tickets/${bookingId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("ticketNumber");
    });
  });
  
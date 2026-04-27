/**
 * Health endpoint contract test.
 * Validates the shape and status code of the /api/health response
 * without requiring a running server.
 */

// Mock NextResponse so we can test the route handler in isolation
const jsonMock = jest.fn((body: unknown, init?: { status?: number }) => ({
  body,
  status: init?.status ?? 200,
}))

jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => jsonMock(body, init),
  },
}))

describe("GET /api/health", () => {
  beforeEach(() => {
    jsonMock.mockClear()
  })

  it("returns status 200 with ok status and timestamp", async () => {
    // Import after mocking
    const { GET } = await import("@/app/api/health/route")
    const response = await GET()

    expect(jsonMock).toHaveBeenCalledTimes(1)
    const [body, init] = jsonMock.mock.calls[0]
    expect(init?.status ?? 200).toBe(200)
    expect(body).toHaveProperty("status", "ok")
    expect(body).toHaveProperty("timestamp")
    expect(new Date((body as { timestamp: string }).timestamp).getTime()).not.toBeNaN()
    expect(response).toBeDefined()
  })
})

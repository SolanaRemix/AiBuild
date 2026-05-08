import { mockModels, mockProjects } from "@/lib/mock-data"

describe("mock-data", () => {
  describe("mockModels", () => {
    it("contains at least one model", () => {
      expect(mockModels.length).toBeGreaterThan(0)
    })

    it("all models have required fields", () => {
      for (const model of mockModels) {
        expect(model.id).toBeTruthy()
        expect(model.name).toBeTruthy()
        expect(model.modelId).toBeTruthy()
        expect(Array.isArray(model.capabilities)).toBe(true)
        expect(["free", "paid"]).toContain(model.costTier)
        expect(typeof model.enabled).toBe("boolean")
      }
    })

    it("has at least one enabled model", () => {
      expect(mockModels.some((m) => m.enabled)).toBe(true)
    })
  })

  describe("mockProjects", () => {
    it("contains at least one project", () => {
      expect(mockProjects.length).toBeGreaterThan(0)
    })

    it("all projects have required fields", () => {
      for (const project of mockProjects) {
        expect(project.id).toBeTruthy()
        expect(project.userId).toBeTruthy()
        expect(project.name).toBeTruthy()
        expect(project.slug).toBeTruthy()
        expect(project.prompt).toBeTruthy()
      }
    })

    it("project slugs are URL-safe", () => {
      for (const project of mockProjects) {
        expect(project.slug).toMatch(/^[a-z0-9-]+$/)
      }
    })
  })
})

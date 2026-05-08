import { ProjectService } from "@/core/domain/project-service"

// Mock the project generator so tests don't call AI APIs
jest.mock("@/core/ai/project-generator", () => ({
  projectGenerator: {
    generate: jest.fn().mockResolvedValue({
      plan: {
        name: "Test App",
        targets: ["web"],
        pages: ["index"],
        components: ["Header"],
      },
      files: [
        { path: "app/page.tsx", content: 'export default function Page() { return <div>Test</div> }' },
        { path: "app/layout.tsx", content: 'export default function Layout({ children }: { children: React.ReactNode }) { return <html><body>{children}</body></html> }' },
      ],
    }),
  },
}))

describe("ProjectService", () => {
  let service: ProjectService

  beforeEach(() => {
    service = new ProjectService()
  })

  it("creates a project from a prompt", async () => {
    const result = await service.createFromPrompt({
      prompt: "Build a test application with a homepage",
      templateType: "app",
      primaryTarget: "web",
      userId: "user_test",
    })

    expect(result.project).toBeDefined()
    expect(result.project.userId).toBe("user_test")
    expect(result.project.prompt).toBe("Build a test application with a homepage")
    expect(result.project.templateType).toBe("app")
    expect(result.project.primaryTarget).toBe("web")
    expect(result.project.status).toBe("ready")
    expect(result.files.length).toBe(2)
  })

  it("generates a slug from the project name", async () => {
    const result = await service.createFromPrompt({
      prompt: "Build a test application with a homepage",
      templateType: "app",
      primaryTarget: "web",
      userId: "user_test",
    })

    expect(result.project.slug).toMatch(/^[a-z0-9-]+$/)
  })

  it("retrieves a project by id", async () => {
    const { project } = await service.createFromPrompt({
      prompt: "Build a test application with a homepage",
      templateType: "app",
      primaryTarget: "web",
      userId: "user_test",
    })

    const retrieved = await service.getById(project.id)
    expect(retrieved).not.toBeNull()
    expect(retrieved?.id).toBe(project.id)
  })

  it("returns null for unknown project id", async () => {
    const result = await service.getById("nonexistent_id")
    expect(result).toBeNull()
  })

  it("lists projects by user", async () => {
    // Mock Date.now() to return distinct values so IDs never collide regardless of
    // timer granularity or event-loop scheduling.
    let tick = 0
    const dateSpy = jest.spyOn(Date, "now").mockImplementation(() => 1000 + tick++)

    await service.createFromPrompt({
      prompt: "Build a test application with a homepage",
      templateType: "app",
      primaryTarget: "web",
      userId: "user_a",
    })
    await service.createFromPrompt({
      prompt: "Build another test app",
      templateType: "landing",
      primaryTarget: "web",
      userId: "user_b",
    })

    dateSpy.mockRestore()

    const userAProjects = await service.listByUser("user_a")
    expect(userAProjects).toHaveLength(1)
    expect(userAProjects[0].userId).toBe("user_a")
  })

  it("returns project files", async () => {
    const { project } = await service.createFromPrompt({
      prompt: "Build a test application with a homepage",
      templateType: "app",
      primaryTarget: "web",
      userId: "user_test",
    })

    const files = await service.getFiles(project.id)
    expect(files.length).toBeGreaterThan(0)
    expect(files[0].projectId).toBe(project.id)
  })

  it("returns empty array for unknown project files", async () => {
    const files = await service.getFiles("nonexistent_project")
    expect(files).toEqual([])
  })
})

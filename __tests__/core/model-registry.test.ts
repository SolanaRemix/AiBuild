import { ModelRegistry, RoutingPolicy } from "@/core/ai/model-registry"
import type { ModelProviderConfig } from "@/lib/types"

const testModels: ModelProviderConfig[] = [
  {
    id: "m1",
    name: "OpenAI",
    modelId: "gpt-4o",
    capabilities: ["code", "chat", "analysis"],
    costTier: "paid",
    enabled: true,
  },
  {
    id: "m2",
    name: "Google",
    modelId: "gemini-2.0-flash",
    capabilities: ["code", "chat"],
    costTier: "free",
    enabled: true,
  },
  {
    id: "m3",
    name: "Disabled",
    modelId: "disabled-model",
    capabilities: ["code"],
    costTier: "free",
    enabled: false,
  },
]

describe("ModelRegistry", () => {
  let registry: ModelRegistry

  beforeEach(() => {
    registry = new ModelRegistry(testModels)
  })

  it("lists all models", async () => {
    const models = await registry.list()
    expect(models).toHaveLength(3)
  })

  it("lists only enabled models", async () => {
    const models = await registry.getEnabledModels()
    expect(models).toHaveLength(2)
    expect(models.every((m) => m.enabled)).toBe(true)
  })

  it("lists enabled code models", async () => {
    const models = await registry.getEnabledCodeModels()
    expect(models.length).toBeGreaterThan(0)
    expect(models.every((m) => m.enabled && m.capabilities.includes("code"))).toBe(true)
  })

  it("gets a model by id", async () => {
    const model = await registry.getById("m1")
    expect(model).not.toBeNull()
    expect(model?.modelId).toBe("gpt-4o")
  })

  it("returns null for unknown id", async () => {
    const model = await registry.getById("nonexistent")
    expect(model).toBeNull()
  })
})

describe("RoutingPolicy", () => {
  let registry: ModelRegistry
  let policy: RoutingPolicy

  beforeEach(() => {
    registry = new ModelRegistry(testModels)
    policy = new RoutingPolicy(registry)
  })

  it("chooses a model for codegen task", async () => {
    const model = await policy.chooseModel("codegen")
    expect(model).toBeDefined()
    expect(model.enabled).toBe(true)
  })

  it("chooses a free model when freeOnly constraint is set", async () => {
    const model = await policy.chooseModel("codegen", { freeOnly: true })
    expect(model.costTier).toBe("free")
  })

  it("prefers analysis-capable model for analysis task", async () => {
    const model = await policy.chooseModel("analysis")
    expect(model.capabilities).toContain("analysis")
  })

  it("throws when no models are available", async () => {
    const emptyRegistry = new ModelRegistry([])
    const emptyPolicy = new RoutingPolicy(emptyRegistry)
    await expect(emptyPolicy.chooseModel("codegen")).rejects.toThrow(
      "No available models"
    )
  })

  it("throws when no free models are available for freeOnly constraint", async () => {
    const paidOnlyModels: ModelProviderConfig[] = [
      {
        id: "p1",
        name: "Paid",
        modelId: "paid-model",
        capabilities: ["code"],
        costTier: "paid",
        enabled: true,
      },
    ]
    const paidRegistry = new ModelRegistry(paidOnlyModels)
    const paidPolicy = new RoutingPolicy(paidRegistry)
    await expect(paidPolicy.chooseModel("codegen", { freeOnly: true })).rejects.toThrow(
      "No available models"
    )
  })
})

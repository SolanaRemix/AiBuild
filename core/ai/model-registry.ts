import type { ModelProviderConfig, TaskKind } from "@/lib/types"
import { mockModels } from "@/lib/mock-data"

/**
 * Model Registry - manages all configured AI model providers.
 * In production, this reads from the database. For now, uses mock data.
 */
export class ModelRegistry {
  private models: ModelProviderConfig[]

  constructor(models?: ModelProviderConfig[]) {
    this.models = models || mockModels
  }

  async list(): Promise<ModelProviderConfig[]> {
    return this.models
  }

  async getEnabledModels(): Promise<ModelProviderConfig[]> {
    return this.models.filter((m) => m.enabled)
  }

  async getEnabledCodeModels(): Promise<ModelProviderConfig[]> {
    return this.models.filter((m) => m.enabled && m.capabilities.includes("code"))
  }

  async getById(id: string): Promise<ModelProviderConfig | null> {
    return this.models.find((m) => m.id === id) || null
  }
}

/**
 * Routing Policy - selects the best model for a given task.
 */
export class RoutingPolicy {
  private registry: ModelRegistry

  constructor(registry: ModelRegistry) {
    this.registry = registry
  }

  async chooseModel(
    task: TaskKind,
    constraints?: { freeOnly?: boolean }
  ): Promise<ModelProviderConfig> {
    const models = await this.registry.getEnabledCodeModels()

    let candidates = models
    if (constraints?.freeOnly) {
      candidates = models.filter((m) => m.costTier === "free")
    }

    if (candidates.length === 0) {
      throw new Error(`No available models for task: ${task}`)
    }

    // Priority: analysis tasks prefer models with analysis capability
    if (task === "analysis") {
      const analysisModels = candidates.filter((m) =>
        m.capabilities.includes("analysis")
      )
      if (analysisModels.length > 0) {
        return analysisModels[0]
      }
    }

    // Default: return first available
    return candidates[0]
  }
}

// Singleton instances
const registry = new ModelRegistry()
const routingPolicy = new RoutingPolicy(registry)

export { registry, routingPolicy }

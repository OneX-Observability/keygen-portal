import config from "@/keygen/config"
import { Artifact, ArtifactStatus } from "@/types/artifacts"
import { DistributionStrategy, Product } from "@/types/products"

interface PublicUrlProps {
  id: string
}

// Stable link for artifacts of OPEN products. Keygen answers it with a 303 to a
// freshly presigned URL, so unlike links.redirect it never expires.
export default function publicUrl({ id }: PublicUrlProps): string {
  return `https://${config.host}/v1/accounts/${config.id}/artifacts/${id}`
}

export function hasPublicUrl(
  artifact: Artifact | null | undefined,
  product: Product | null | undefined,
): boolean {
  return (
    artifact?.attributes.status === ArtifactStatus.Uploaded &&
    product?.attributes.distributionStrategy === DistributionStrategy.Open
  )
}

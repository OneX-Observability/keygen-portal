import { Link } from "lucide-react"

import { Button } from "@/components/ui/button"
import * as keygen from "@/keygen"
import { copyToClipboard } from "@/lib/clipboard"
import { Artifact } from "@/types/artifacts"
import { Product } from "@/types/products"
import { cn } from "@/lib/utils"

interface ArtifactPublicLinkButtonProps {
  artifact: Artifact
  product: Product | null | undefined
  size?: "default" | "sm"
  variant?: "default" | "outline"
  className?: string
}

export default function ArtifactPublicLinkButton({
  artifact,
  product,
  size = "default",
  variant = "outline",
  className,
}: ArtifactPublicLinkButtonProps) {
  if (!keygen.artifacts.hasPublicUrl(artifact, product)) {
    return null
  }

  return (
    <Button
      size={size}
      variant={variant}
      className={cn(className)}
      title="Anyone with this link can download the artifact"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void copyToClipboard(keygen.artifacts.publicUrl({ id: artifact.id }))
      }}
    >
      <Link className="size-4" />
      Copy public link
    </Button>
  )
}

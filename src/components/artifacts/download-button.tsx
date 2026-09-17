import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useDownloadArtifact } from "@/hooks/use-download-artifact"
import { Artifact, ArtifactStatus } from "@/types/artifacts"
import { cn } from "@/lib/utils"

interface ArtifactDownloadButtonProps {
  artifact: Artifact
  size?: "default" | "sm"
  variant?: "default" | "outline"
  className?: string
}

export default function ArtifactDownloadButton({
  artifact,
  size = "default",
  variant = "default",
  className,
}: ArtifactDownloadButtonProps) {
  const { download, isDownloading } = useDownloadArtifact()

  if (artifact.attributes.status !== ArtifactStatus.Uploaded) {
    return null
  }

  return (
    <Button
      size={size}
      variant={variant}
      disabled={isDownloading}
      className={cn(className)}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void download(artifact.id, artifact.links.redirect)
      }}
    >
      <Download className="size-4" />
      {isDownloading ? "Downloading…" : "Download"}
    </Button>
  )
}

"use client"

interface ScreenshotOptions {
  selector?: string
  format?: "png" | "jpeg"
  quality?: number
  scale?: number
  width?: number
  height?: number
  includeBackground?: boolean
  hideControls?: boolean
}

interface ScreenshotResult {
  success: boolean
  dataUrl?: string
  error?: string
}

export async function captureScreenshot(options: ScreenshotOptions = {}): Promise<ScreenshotResult> {
  try {
    // Dynamic import to avoid SSR issues
    const html2canvas = (await import("html2canvas")).default

    const {
      selector = "body",
      format = "png",
      quality = 0.9,
      scale = 2,
      width,
      height,
      includeBackground = true,
      hideControls = true,
    } = options

    // Find the target element
    const element = document.querySelector(selector) as HTMLElement
    if (!element) {
      return { success: false, error: `Element with selector "${selector}" not found` }
    }

    // Hide controls if requested
    const controlElements: HTMLElement[] = []
    if (hideControls) {
      const controls = element.querySelectorAll(
        '[data-screenshot-hide], .group button, .opacity-0, [role="button"]:not([data-screenshot-keep])',
      )
      controls.forEach((el) => {
        const htmlEl = el as HTMLElement
        if (htmlEl.style.display !== "none") {
          controlElements.push(htmlEl)
          htmlEl.style.visibility = "hidden"
        }
      })
    }

    // Configure html2canvas options
    const canvasOptions = {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: includeBackground ? null : "transparent",
      width: width || element.scrollWidth,
      height: height || element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: width || window.innerWidth,
      windowHeight: height || window.innerHeight,
      ignoreElements: (element: Element) => {
        return element.classList.contains("screenshot-ignore") || element.hasAttribute("data-screenshot-ignore")
      },
    }

    // Capture the screenshot
    const canvas = await html2canvas(element, canvasOptions)

    // Restore hidden controls
    controlElements.forEach((el) => {
      el.style.visibility = ""
    })

    // Convert to data URL
    const dataUrl = canvas.toDataURL(`image/${format}`, format === "jpeg" ? quality : undefined)

    return { success: true, dataUrl }
  } catch (error) {
    console.error("Screenshot capture failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

export function downloadScreenshot(dataUrl: string, filename: string, format: "png" | "jpeg" = "png") {
  const link = document.createElement("a")
  link.href = dataUrl
  link.download = `${filename}.${format}`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function shareScreenshot(dataUrl: string, filename: string, format: "png" | "jpeg" = "png") {
  try {
    const response = await fetch(dataUrl)
    const blob = await response.blob()
    const file = new File([blob], `${filename}.${format}`, {
      type: `image/${format}`,
    })

    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "Dashboard Screenshot",
        text: "Check out this dashboard!",
        files: [file],
      })
      return { success: true }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])
      return { success: true, method: "clipboard" }
    }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Share failed" }
  }
}

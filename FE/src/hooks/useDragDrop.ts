

"use client"

import type React from "react"

import { useCallback, useRef, useState } from "react"

export interface DragState {
  isDragging: boolean
  draggedItem: any
  dragOffset: { x: number; y: number }
  currentPosition: { x: number; y: number }
}

export function useDragAndDrop() {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedItem: null,
    dragOffset: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 },
  })

  const dragRef = useRef<HTMLElement | null>(null)

  const startDrag = useCallback((item: any, event: React.MouseEvent, element?: HTMLElement) => {
    const target = element || (event.currentTarget as HTMLElement)
    const rect = target.getBoundingClientRect()

    setDragState({
      isDragging: true,
      draggedItem: item,
      dragOffset: {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
      currentPosition: {
        x: event.clientX,
        y: event.clientY,
      },
    })

    dragRef.current = target
    event.preventDefault()
  }, [])

  const updateDrag = useCallback(
    (event: MouseEvent) => {
      if (!dragState.isDragging) return

      setDragState((prev) => ({
        ...prev,
        currentPosition: {
          x: event.clientX,
          y: event.clientY,
        },
      }))
    },
    [dragState.isDragging],
  )

  const endDrag = useCallback(() => {
    setDragState({
      isDragging: false,
      draggedItem: null,
      dragOffset: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 },
    })
    dragRef.current = null
  }, [])

  return {
    dragState,
    startDrag,
    updateDrag,
    endDrag,
    dragRef,
  }
}

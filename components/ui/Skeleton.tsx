import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  height?: string
}

export default function Skeleton({ className, height = 'h-4' }: SkeletonProps) {
  return (
    <div className={cn('skeleton', height, className)} />
  )
}



export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-cyan-500/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
        <div className="absolute inset-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-cyan-500/20 animate-pulse">
      <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800"></div>
      <div className="p-6">
        <div className="h-6 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded mb-3"></div>
        <div className="h-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded mb-3 w-1/2"></div>
        <div className="h-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded w-1/3"></div>
      </div>
    </div>
  )
}
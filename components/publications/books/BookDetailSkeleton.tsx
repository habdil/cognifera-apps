"use client";


export function BookDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            {/* Back Button Skeleton */}
            <div className="mb-6">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Book Cover and Thumbnails Skeleton */}
              <div className="space-y-4">
                {/* Main cover */}
                <div className="aspect-[3/4] bg-gray-200 rounded-lg"></div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="aspect-[3/4] bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>

              {/* Book Details Skeleton */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title and Actions */}
                <div>
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>

                {/* Purchase Options Skeleton */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>

                  <div className="p-3 bg-white rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-5 bg-gray-200 rounded w-24 mb-1"></div>
                        <div className="h-7 bg-gray-200 rounded w-32"></div>
                      </div>
                      <div className="h-5 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="border border-gray-200 rounded-lg flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-l-lg"></div>
                      <div className="h-10 w-8 bg-gray-100"></div>
                      <div className="h-10 w-10 bg-gray-200 rounded-r-lg"></div>
                    </div>
                    <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>

                {/* Description Skeleton */}
                <div>
                  <div className="h-6 bg-gray-200 rounded w-24 mb-3"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>

                {/* Book Information Skeleton */}
                <div>
                  <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex">
                          <div className="h-4 bg-gray-200 rounded w-24 mr-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex">
                          <div className="h-4 bg-gray-200 rounded w-24 mr-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Promotional Banner Skeleton */}
            <div className="mt-12 bg-gray-200 rounded-lg p-8">
              <div className="max-w-2xl mx-auto text-center">
                <div className="h-8 bg-gray-300 rounded w-96 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-80 mx-auto mb-6"></div>
                <div className="h-12 bg-gray-300 rounded-lg w-32 mx-auto"></div>
              </div>
            </div>

            {/* Recommendations Skeleton */}
            <div className="mt-16">
              <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-3"></div>
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-5 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Actions Skeleton */}
              <div className="mt-12 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-gray-200 rounded"></div>
                    <div>
                      <div className="h-5 bg-gray-200 rounded w-32 mb-1"></div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-10 bg-gray-200 rounded-lg w-40"></div>
                    <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
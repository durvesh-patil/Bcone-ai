"use client";

import { formatCurrency, formatTime, getModeIcon } from "@/lib/utils";
import {
  TrendingDown,
  Clock,
  DollarSign,
  Navigation,
  Leaf,
} from "lucide-react";
import { RouteMap } from "./RouteMap";

interface RouteResultsProps {
  routeData: any;
  disruptionActive: boolean;
}

export function RouteResults({
  routeData,
  disruptionActive,
}: RouteResultsProps) {
  const { routes, request } = routeData;
  const topRoute = routes[0];

  return (
    <div className="space-y-6">
      {/* Map Visualization */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            Route Visualization
          </h3>
          <p className="text-sm text-slate-600">
            {request.origin} → {request.destination}
          </p>
        </div>
        <RouteMap routes={routes} disruptionActive={disruptionActive} />
      </div>

      {/* Route Options */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Optimized Route Options
          </h3>
          <div className="text-sm text-slate-600">
            Priority:{" "}
            <span className="font-semibold capitalize">{request.priority}</span>
          </div>
        </div>

        <div className="space-y-4">
          {routes.map((route: any, idx: number) => (
            <div
              key={idx}
              className={`border-2 rounded-xl p-4 transition-all ${
                idx === 0
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {idx === 0 && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      RECOMMENDED
                    </span>
                  )}
                  <span className="text-2xl">
                    {getModeIcon(route.segments[0].mode)}
                  </span>
                  <span className="font-semibold text-slate-900 capitalize">
                    {route.segments[0].mode}
                    {route.segments.length > 1 && " + Multi-Modal"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
                    <DollarSign className="w-4 h-4" />
                    Cost
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    {formatCurrency(route.totalCost)}
                  </div>
                  {/* Visual comparison bar */}
                  <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          (route.totalCost /
                            Math.max(...routes.map((r: any) => r.totalCost))) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {route.totalCost ===
                    Math.min(...routes.map((r: any) => r.totalCost))
                      ? "Cheapest"
                      : ""}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    Time
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    {formatTime(route.totalTime)}
                  </div>
                  {/* Visual comparison bar */}
                  <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          (route.totalTime /
                            Math.max(...routes.map((r: any) => r.totalTime))) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {route.totalTime ===
                    Math.min(...routes.map((r: any) => r.totalTime))
                      ? "Fastest"
                      : ""}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
                    <Navigation className="w-4 h-4" />
                    Distance
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    {route.totalDistance.toLocaleString()} km
                  </div>
                  {/* Visual comparison bar */}
                  <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          (route.totalDistance /
                            Math.max(
                              ...routes.map((r: any) => r.totalDistance)
                            )) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {route.totalDistance ===
                    Math.min(...routes.map((r: any) => r.totalDistance))
                      ? "Shortest"
                      : ""}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
                    <Leaf className="w-4 h-4" />
                    Carbon
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    {route.carbonFootprint.toFixed(0)} kg
                  </div>
                  {/* Visual comparison bar */}
                  <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          (route.carbonFootprint /
                            Math.max(
                              ...routes.map((r: any) => r.carbonFootprint)
                            )) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {route.carbonFootprint ===
                    Math.min(...routes.map((r: any) => r.carbonFootprint))
                      ? "Greenest"
                      : ""}
                  </p>
                </div>
              </div>

              {/* Route Segments */}
              {route.segments.length > 1 && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-sm font-medium text-slate-700 mb-2">
                    Route Segments:
                  </p>
                  <div className="space-y-2">
                    {route.segments.map((segment: any, segIdx: number) => (
                      <div
                        key={segIdx}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <span>{getModeIcon(segment.mode)}</span>
                        <span>
                          {segment.from} → {segment.to}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span>{formatCurrency(segment.cost)}</span>
                        <span className="text-slate-400">•</span>
                        <span>{formatTime(segment.time)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Carrier Info */}
              {route.segments[0].carrier && (
                <div className="mt-3 text-sm text-slate-600">
                  Carrier:{" "}
                  <span className="font-medium">
                    {route.segments[0].carrier}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cost Comparison */}
        {routes.length > 1 && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2 text-green-600">
              <TrendingDown className="w-5 h-5" />
              <span className="font-semibold">
                Save{" "}
                {formatCurrency(
                  routes[routes.length - 1].totalCost - topRoute.totalCost
                )}
              </span>
              <span className="text-slate-600 text-sm">
                by choosing the recommended route over the most expensive option
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import {
  Ship,
  MapPin,
  Target,
  Clock,
  DollarSign,
  Loader2,
  Zap,
} from "lucide-react";

interface RouteOptimizerProps {
  onRouteCalculated: (data: any) => void;
  recalculateTrigger?: number;
}

export function RouteOptimizer({
  onRouteCalculated,
  recalculateTrigger,
}: RouteOptimizerProps) {
  const [origin, setOrigin] = useState("Shanghai");
  const [destination, setDestination] = useState("Hamburg");
  const [priority, setPriority] = useState<"cost" | "time" | "balanced">(
    "balanced"
  );

  const optimizeRouteMutation = trpc.optimizeRoute.useQuery(
    { origin, destination, priority },
    { enabled: false }
  );

  const handleOptimize = async () => {
    const result = await optimizeRouteMutation.refetch();
    if (result.data) {
      onRouteCalculated(result.data);
    }
  };

  // Auto-recalculate when trigger changes
  useEffect(() => {
    if (recalculateTrigger && recalculateTrigger > 0 && origin && destination) {
      console.log(
        "✅ Recalculate triggered:",
        recalculateTrigger,
        "Origin:",
        origin,
        "Dest:",
        destination
      );
      handleOptimize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recalculateTrigger]);

  const popularRoutes = [
    { from: "Shanghai", to: "Hamburg", label: "🇨🇳 → 🇩🇪" },
    { from: "Mumbai", to: "Rotterdam", label: "🇮🇳 → 🇳🇱" },
    { from: "Singapore", to: "Los Angeles", label: "🇸🇬 → 🇺🇸" },
    { from: "Shanghai", to: "New York", label: "🇨🇳 → 🇺🇸" },
    { from: "Mumbai", to: "London", label: "🇮🇳 → 🇬🇧" },
  ];

  const handleQuickRoute = (from: string, to: string) => {
    setOrigin(from);
    setDestination(to);
    // Auto-calculate after a brief delay
    setTimeout(() => {
      handleOptimize();
    }, 100);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Ship className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">
          Route Optimizer
        </h2>
      </div>

      <div className="space-y-4">
        {/* Origin */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Origin
          </label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter origin city"
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Target className="w-4 h-4 inline mr-1" />
            Destination
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Enter destination city"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Optimization Priority
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPriority("cost")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                priority === "cost"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <DollarSign className="w-4 h-4 inline mr-1" />
              Cost
            </button>
            <button
              onClick={() => setPriority("time")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                priority === "time"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Clock className="w-4 h-4 inline mr-1" />
              Time
            </button>
            <button
              onClick={() => setPriority("balanced")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                priority === "balanced"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Balanced
            </button>
          </div>
        </div>

        {/* Optimize Button */}
        <button
          onClick={handleOptimize}
          disabled={optimizeRouteMutation.isFetching}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {optimizeRouteMutation.isFetching ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Ship className="w-5 h-5" />
              Optimize Route
            </>
          )}
        </button>

        {/* Popular Routes Quick Select */}
        <div className="pt-4 border-t border-slate-200">
          <p className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Quick Demo Routes:
          </p>
          <div className="grid grid-cols-1 gap-2">
            {popularRoutes.map((route, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickRoute(route.from, route.to)}
                disabled={optimizeRouteMutation.isFetching}
                className="w-full text-left px-3 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between group"
              >
                <span className="text-slate-700">
                  {route.from} → {route.to}
                </span>
                <span className="text-lg">{route.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

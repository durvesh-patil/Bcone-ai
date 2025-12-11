"use client";

import { formatCurrency, formatTime } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Package,
  CheckCircle,
} from "lucide-react";

interface DashboardProps {
  selectedRoute: any;
}

export function Dashboard({ selectedRoute }: DashboardProps) {
  if (!selectedRoute) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Performance Dashboard
        </h2>
        <p className="text-slate-600 text-sm">
          Calculate a route to see performance metrics
        </p>
      </div>
    );
  }

  const topRoute = selectedRoute.routes[0];
  const mostExpensiveRoute =
    selectedRoute.routes[selectedRoute.routes.length - 1];
  const savings = mostExpensiveRoute.totalCost - topRoute.totalCost;
  const timeAdvantage = mostExpensiveRoute.totalTime - topRoute.totalTime;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">
        Performance Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cost Savings */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-900">
            {formatCurrency(savings)}
          </div>
          <div className="text-sm text-green-700 mt-1">Cost Savings</div>
          <div className="text-xs text-green-600 mt-2">
            vs. most expensive option
          </div>
        </div>

        {/* Time Optimization */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-900">
            {formatTime(topRoute.totalTime)}
          </div>
          <div className="text-sm text-blue-700 mt-1">Delivery Time</div>
          <div className="text-xs text-blue-600 mt-2">
            {timeAdvantage > 0
              ? `${formatTime(timeAdvantage)} faster`
              : "Optimal"}
          </div>
        </div>

        {/* Total Distance */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-900">
            {topRoute.totalDistance.toLocaleString()}
          </div>
          <div className="text-sm text-purple-700 mt-1">Kilometers</div>
          <div className="text-xs text-purple-600 mt-2">Total distance</div>
        </div>

        {/* Efficiency Score */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-amber-100 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-900">
            {Math.round((topRoute.score / (topRoute.score + 0.001)) * 100)}%
          </div>
          <div className="text-sm text-amber-700 mt-1">Efficiency</div>
          <div className="text-xs text-amber-600 mt-2">Overall rating</div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">
              Carbon Footprint
            </h4>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {topRoute.carbonFootprint.toFixed(0)}
              </span>
              <span className="text-slate-600">kg CO₂</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Environmental impact</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">
              Route Complexity
            </h4>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {topRoute.segments.length}
              </span>
              <span className="text-slate-600">
                segment{topRoute.segments.length !== 1 ? "s" : ""}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Multi-modal legs</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-slate-700 mb-2">
              Alternative Routes
            </h4>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {selectedRoute.routes.length}
              </span>
              <span className="text-slate-600">options</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Available choices</p>
          </div>
        </div>
      </div>

      {/* Business Impact Summary */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Business Impact</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>
            • Saved <strong>{formatCurrency(savings)}</strong> compared to
            alternatives
          </li>
          <li>
            • Delivery in <strong>{formatTime(topRoute.totalTime)}</strong> via{" "}
            <strong className="capitalize">{topRoute.segments[0].mode}</strong>
          </li>
          <li>
            • <strong>{topRoute.carbonFootprint.toFixed(0)} kg CO₂</strong>{" "}
            environmental footprint
          </li>
          {selectedRoute.request.priority === "cost" && (
            <li>
              • Optimized for <strong>lowest cost</strong> priority
            </li>
          )}
          {selectedRoute.request.priority === "time" && (
            <li>
              • Optimized for <strong>fastest delivery</strong> priority
            </li>
          )}
          {selectedRoute.request.priority === "balanced" && (
            <li>
              • <strong>Balanced</strong> cost and time optimization
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

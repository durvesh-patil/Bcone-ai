"use client";

import { useState } from "react";
import { RouteOptimizer } from "@/components/RouteOptimizer";
import { RouteResults } from "@/components/RouteResults";
import { NewsSimulator } from "@/components/NewsSimulator";
import { Dashboard } from "@/components/Dashboard";
import { Ship, AlertTriangle } from "lucide-react";

export default function Home() {
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [disruptionActive, setDisruptionActive] = useState(false);
  const [recalculateTrigger, setRecalculateTrigger] = useState(0);

  const handleRecalculateRoutes = () => {
    // When recalculating due to disruption, we want to show different recommendations
    // In a real system, this would call the API with disruption context
    // For demo: we'll reorder routes to show air/alternative options first

    if (selectedRoute && disruptionActive) {
      // Reorder routes: push sea route to last, prioritize air/multi-modal
      const reorderedRoutes = [...selectedRoute.routes];
      const seaRoute = reorderedRoutes.find(
        (r) => r.segments[0].mode === "sea" && r.segments.length === 1
      );
      const otherRoutes = reorderedRoutes.filter((r) => r !== seaRoute);

      if (seaRoute) {
        const newRouteData = {
          ...selectedRoute,
          routes: [...otherRoutes, seaRoute], // Sea route goes last
        };
        setSelectedRoute(newRouteData);
      }
    } else {
      // Normal recalculation without disruption
      setRecalculateTrigger((prev) => prev + 1);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Ship className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  AI Supply Chain Control Tower
                </h1>
                <p className="text-sm text-slate-600">
                  Geopolitical Risk Intelligence & Dynamic Route Optimization
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-slate-600">System Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Route Optimizer */}
          <div className="lg:col-span-1">
            <RouteOptimizer
              onRouteCalculated={setSelectedRoute}
              recalculateTrigger={recalculateTrigger}
            />
          </div>

          {/* Middle Column: Route Results & Map */}
          <div className="lg:col-span-2">
            {selectedRoute ? (
              <RouteResults
                routeData={selectedRoute}
                disruptionActive={disruptionActive}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Ship className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Enter Route Details
                  </h3>
                  <p className="text-slate-600">
                    Start by entering your origin, destination, and preferences
                    to see optimized multi-modal transport routes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Dashboard & News Simulator */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dashboard Metrics */}
          <div className="lg:col-span-2">
            <Dashboard selectedRoute={selectedRoute} />
          </div>

          {/* News Simulator */}
          <div className="lg:col-span-1">
            <NewsSimulator
              selectedRoute={selectedRoute}
              onDisruptionSimulated={setDisruptionActive}
              onRecalculateRoutes={handleRecalculateRoutes}
            />
          </div>
        </div>

        {/* Warning Banner for Demo */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">Demo Mode</h4>
              <p className="text-sm text-amber-800">
                This is a prototype demonstration. Click "Simulate Disruption"
                to see how the AI agent analyzes geopolitical events and
                automatically suggests alternative routes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-6">
        <div className="container mx-auto px-6 text-center text-slate-600 text-sm">
          <p>
            Built for{" "}
            <strong>Bristlecone's Got AI Talent Hackathon 2025</strong>
          </p>
          <p className="mt-1">
            Powered by Mistral AI, Next.js, Mapbox, and Modern TypeScript
          </p>
        </div>
      </footer>
    </main>
  );
}

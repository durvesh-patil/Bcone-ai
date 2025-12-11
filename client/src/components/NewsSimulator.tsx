"use client";

import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { AlertTriangle, Newspaper, Loader2, Zap, Clock } from "lucide-react";
import { getSeverityColor } from "@/lib/utils";

interface NewsSimulatorProps {
  selectedRoute: any;
  onDisruptionSimulated: (active: boolean) => void;
  onRecalculateRoutes?: () => void;
}

export function NewsSimulator({
  selectedRoute,
  onDisruptionSimulated,
  onRecalculateRoutes,
}: NewsSimulatorProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  const newsEventsQuery = trpc.getNewsEvents.useQuery();
  const analyzeNewsMutation = trpc.analyzeNews.useMutation();

  const handleSimulateDisruption = async (eventId: string) => {
    if (!selectedRoute) {
      alert("Please calculate a route first!");
      return;
    }

    setSelectedEvent(eventId);
    onDisruptionSimulated(true);

    const event = newsEventsQuery.data?.find((e) => e.id === eventId);
    if (!event) return;

    // Analyze the news event with AI
    console.log("\n🔍 ========== NEWS ANALYSIS START ==========");
    console.log("📰 Event:", event.title);
    console.log(
      "🗺️  Route:",
      selectedRoute.request.origin,
      "→",
      selectedRoute.request.destination
    );
    console.log("🚢 Current Mode:", selectedRoute.routes[0].segments[0].mode);

    try {
      const analysis = await analyzeNewsMutation.mutateAsync({
        newsTitle: event.title,
        newsContent: event.content,
        routeOrigin: selectedRoute.request.origin,
        routeDestination: selectedRoute.request.destination,
        currentMode: selectedRoute.routes[0].segments[0].mode,
      });

      console.log("\n🤖 MISTRAL AI RESPONSE:");
      console.log(JSON.stringify(analysis, null, 2));
      console.log("========== NEWS ANALYSIS END ==========\n");

      setAiAnalysis(analysis);
    } catch (error) {
      console.error("Error analyzing news:", error);
    }
  };

  const handleReset = () => {
    setSelectedEvent(null);
    setAiAnalysis(null);
    onDisruptionSimulated(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-amber-100 p-2 rounded-lg">
          <Newspaper className="w-5 h-5 text-amber-600" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">
          Disruption Simulator
        </h2>
      </div>

      {!selectedEvent ? (
        <>
          <p className="text-sm text-slate-600 mb-4">
            Simulate a real-world disruption to see how the AI agent analyzes
            impact and suggests alternatives.
          </p>

          <div className="space-y-3">
            {newsEventsQuery.isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              </div>
            )}

            {newsEventsQuery.data?.map((event) => (
              <button
                key={event.id}
                onClick={() => handleSimulateDisruption(event.id)}
                disabled={!selectedRoute || analyzeNewsMutation.isPending}
                className="w-full text-left p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div
                    className={`text-xs font-semibold px-2 py-1 rounded border ${getSeverityColor(
                      event.severity
                    )}`}
                  >
                    {event.severity.toUpperCase()}
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <h4 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600">
                  {event.title}
                </h4>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {event.content.substring(0, 150)}...
                </p>
                <div className="mt-2 text-xs text-slate-500">
                  Source: {event.source} • {event.category}
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {/* AI Analysis */}
          {analyzeNewsMutation.isPending && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-900">
                    AI Agent Analyzing...
                  </p>
                  <p className="text-sm text-blue-700">
                    Evaluating impact on your route
                  </p>
                </div>
              </div>
            </div>
          )}

          {aiAnalysis && (
            <div className="animate-fade-in space-y-4">
              {/* Severity Alert */}
              <div
                className={`border-2 rounded-lg p-4 ${getSeverityColor(
                  aiAnalysis.severity
                )}`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      {aiAnalysis.severity.toUpperCase()} RISK DETECTED
                    </h3>
                    <p className="text-sm">{aiAnalysis.summary}</p>
                  </div>
                </div>
              </div>

              {/* Impact Details */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-3">
                  Impact Analysis
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-600 mb-1">
                      Cost Impact
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                      +{aiAnalysis.costImpact}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 mb-1">
                      Time Delay
                    </div>
                    <div className="text-2xl font-bold text-orange-600">
                      +{Math.round(aiAnalysis.timeImpact / 24)} days
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-300">
                  <div className="text-xs text-slate-600 mb-2">
                    Affected Regions
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aiAnalysis.affectedLocations.map(
                      (loc: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-white px-2 py-1 rounded text-xs text-slate-700 border border-slate-200"
                        >
                          {loc}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-slate-600 mb-2">
                    Expected Duration
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-900">
                      {aiAnalysis.impactDuration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI Recommendations
                </h4>
                <ul className="space-y-2">
                  {aiAnalysis.recommendations.map(
                    (rec: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-green-800"
                      >
                        <span className="text-green-600 font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Recalculate Button */}
              {onRecalculateRoutes && (
                <button
                  onClick={onRecalculateRoutes}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Get Alternative Routes
                </button>
              )}

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
              >
                Reset Simulation
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

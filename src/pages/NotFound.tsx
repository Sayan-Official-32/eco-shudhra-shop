import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-10">
      {/* Background circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl animate-float" />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-lime-200/40 blur-3xl animate-float" />
      </div>

      <div className="relative w-full max-w-xl rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-emerald-100/70 dark:border-emerald-500/20 shadow-lg shadow-emerald-100/60 dark:shadow-black/40 backdrop-blur-sm px-6 py-8 md:px-10 md:py-12 animate-fade-in-up">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping-slow" />
          Eco‑Shudhra Shop
        </div>

        {/* 404 + leaf */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative">
            <p className="text-5xl md:text-6xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 leading-none">
              404
            </p>
            <span className="absolute -right-2 -top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-200 text-lg shadow-sm animate-float">
              🌿
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50">
              This page has gone off the trail
            </h1>
            <p className="mt-1 text-sm md:text-base text-slate-600 dark:text-slate-300">
              The product or page you are looking for could not be found. Let’s
              guide you back to sustainable shopping.
            </p>
          </div>
        </div>

        {/* Hint / path info */}
        <div className="mb-6 rounded-xl bg-emerald-50/70 dark:bg-slate-900/80 border border-emerald-100 dark:border-emerald-500/20 px-4 py-3 text-xs md:text-sm font-mono text-emerald-900/80 dark:text-emerald-100 flex flex-col gap-1">
          <span className="font-semibold uppercase tracking-wide text-[10px] md:text-[11px] text-emerald-700 dark:text-emerald-300">
            Requested path
          </span>
          <span className="truncate">
            {location.pathname || "/"}
          </span>
          <span className="text-[11px] text-emerald-700/80 dark:text-emerald-300/80">
            Tip: check the URL or head back to the shop.
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-1 inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white transition-colors duration-200"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700">
              ←
            </span>
            Go back
          </button>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-300/60 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:shadow-emerald-500/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              Continue shopping
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 group-hover:animate-arrow-slide">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500/30 dark:bg-slate-900/80 dark:text-emerald-200 dark:hover:bg-slate-900 transition-colors duration-200"
            >
              View cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

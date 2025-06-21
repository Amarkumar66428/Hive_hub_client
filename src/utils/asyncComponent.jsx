// utils/asyncComponent.jsx
import React, { lazy, Suspense, memo } from "react";
import AppLoading from "../pages/hiveloading";

// WeakMap cache to prevent memory leaks and avoid recreating components
const componentCache = new WeakMap();

const asyncComponent = (importFunc, options = {}) => {
  const {
    fallback = <AppLoading />,
    errorFallback = <div>Error loading component</div>,
    displayName = "AsyncComponent",
    retryCount = 3
  } = options;

  // Return cached component if exists
  if (componentCache.has(importFunc)) {
    return componentCache.get(importFunc);
  }

  // Enhanced lazy component with retry logic and error handling
  const LazyComponent = lazy(() => {
    let attempts = 0;
    
    const attemptImport = async () => {
      try {
        const module = await importFunc();
        return module;
      } catch (error) {
        attempts++;
        
        // Retry logic for network failures
        if (attempts < retryCount && error.name === 'ChunkLoadError') {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000));
          return attemptImport();
        }
        
        // Return error component if all retries failed
        console.error(`Failed to load component after ${attempts} attempts:`, error);
        return { 
          default: () => errorFallback 
        };
      }
    };
    
    return attemptImport();
  });

  // Memoized wrapper component to prevent unnecessary re-renders
  const ComponentWithSuspense = memo(
    function ComponentWithSuspense(props) {
      return (
        <Suspense fallback={fallback}>
          <LazyComponent {...props} />
        </Suspense>
      );
    },
    // Custom comparison function for better memoization
    (prevProps, nextProps) => {
      // Shallow comparison of props
      const prevKeys = Object.keys(prevProps);
      const nextKeys = Object.keys(nextProps);
      
      if (prevKeys.length !== nextKeys.length) return false;
      
      return prevKeys.every(key => prevProps[key] === nextProps[key]);
    }
  );

  // Set display name for better debugging
  ComponentWithSuspense.displayName = displayName;

  // Add utility methods
  ComponentWithSuspense.preload = () => {
    try {
      return importFunc();
    } catch (error) {
      console.warn('Preload failed:', error);
      return Promise.resolve();
    }
  };

  // Method to check if component is already loaded
  ComponentWithSuspense.isLoaded = () => {
    // This is a simple heuristic - in practice, you might want more sophisticated checking
    return componentCache.has(importFunc);
  };

  // Cache the component to avoid recreation
  componentCache.set(importFunc, ComponentWithSuspense);

  return ComponentWithSuspense;
};

// Higher-order function for creating multiple async components with shared options
asyncComponent.createFactory = (defaultOptions = {}) => {
  return (importFunc, componentOptions = {}) => {
    return asyncComponent(importFunc, { ...defaultOptions, ...componentOptions });
  };
};

// Utility to preload multiple components
asyncComponent.preloadAll = (components) => {
  return Promise.allSettled(
    components.map(component => 
      typeof component.preload === 'function' ? component.preload() : Promise.resolve()
    )
  );
};

// Clear cache utility (useful for development/testing)
asyncComponent.clearCache = () => {
  // Note: WeakMap doesn't have a clear method, but this is for documentation
  console.warn('Cache clearing not supported with WeakMap. Restart application to clear cache.');
};

export default asyncComponent;
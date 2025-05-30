// utils/asyncComponent.jsx
import React, { lazy, Suspense } from "react";
import AppLoading from "../pages/hiveloading";

const asyncComponent = (importFunc) => {
  const LazyComponent = lazy(importFunc);

  // Return a valid functional component
  return function ComponentWithSuspense(props) {
    return (
      <Suspense fallback={<AppLoading />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

export default asyncComponent;

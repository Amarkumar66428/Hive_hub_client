import React, { Suspense } from "react";
const Template = React.lazy(() => import("../../templates/templates1"));

const CreateStore = () => {

  return (
    <Suspense fallback={<div>Loading store...</div>}>
      <Template />
    </Suspense>
  );
};

export default CreateStore;

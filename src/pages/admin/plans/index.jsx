import React, { useState } from "react";
import CreateTier from "./createplans";
import ManagePlans from "./managePlans";

const PlansScreen = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!open ? (
        <ManagePlans setOpen={setOpen} />
      ) : (
        <CreateTier setOpen={setOpen} />
      )}
    </>
  );
};

export default PlansScreen;

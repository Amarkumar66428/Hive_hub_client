import React, { useState } from "react";
import CreateTier from "./createplans";
import ManagePlans from "./managePlans";

const PlansScreen = () => {
  const [open, setOpen] = useState(false);
  const [selectPlan, setSelectPlan] = useState(null);

  return (
    <>
      {!open ? (
        <ManagePlans
          setOpen={setOpen}
          selectPlan={selectPlan}
          setSelectPlan={setSelectPlan}
        />
      ) : (
        <CreateTier
          setOpen={setOpen}
          selectPlan={selectPlan}
          setSelectPlan={setSelectPlan}
        />
      )}
    </>
  );
};

export default PlansScreen;

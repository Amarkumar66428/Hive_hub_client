import React, { useState } from "react";
import WelcomeScreen from "./welcomeScreen";
import TemplateSelector from "./selectTemplate";
import CreateStore from "./createStore";

const StorePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState({
    category: "",
    id: "",
  });

  return {
    1: <WelcomeScreen onStart={() => setCurrentStep(2)} />,
    2: (
      <TemplateSelector
        onNext={() => setCurrentStep(3)}
        setSelectedTemplate={setSelectedTemplate}
      />
    ),
    3: (
      <CreateStore
        previousStep={() => setCurrentStep(2)}
        selectedTemplate={selectedTemplate}
      />
    ),
  }[currentStep];
};

export default StorePage;

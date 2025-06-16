import { useState } from "react";
import WelcomeScreen from "./welcomeScreen";
import TemplateSelector from "./selectTemplate";
import { useLocation } from "react-router-dom";
import PreviewTemplate from "./previewTemplate";

const StorePage = () => {
  const location = useLocation();
  const screen = location.state?.screen;
  const [currentStep, setCurrentStep] = useState(screen || 1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return {
    1: <WelcomeScreen onStart={() => setCurrentStep(2)} />,
    2: (
      <TemplateSelector
        setCurrentStep={setCurrentStep}
        setSelectedTemplate={setSelectedTemplate}
      />
    ),
    3: (
      <PreviewTemplate
        setCurrentStep={setCurrentStep}
        selectedTemplate={selectedTemplate}
      />
    ),
  }[currentStep];
};

export default StorePage;

import { HeroSection } from './components/HeroSection';
import { ProductOverview } from './components/ProductOverview';
import { ComponentBreakdown } from './components/ComponentBreakdown';
import { SmokePerformance } from './components/SmokePerformance';
import { HowItWorks } from './components/HowItWorks';
import { AppControlSection } from './components/AppControlSection';
import { ExperienceSection } from './components/ExperienceSection';
import { BenefitsGrid } from './components/BenefitsGrid';
import { ClosingSection } from './components/ClosingSection';
import { ScrollProgress } from './components/ScrollProgress';

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen antialiased">
      <ScrollProgress />

      <div id="hero"><HeroSection /></div>
      <div id="product"><ProductOverview /></div>
      <div id="components"><ComponentBreakdown /></div>
      <div id="performance"><SmokePerformance /></div>
      <div id="how-it-works"><HowItWorks /></div>
      <div id="app-control"><AppControlSection /></div>
      <div id="experience"><ExperienceSection /></div>
      <div id="benefits"><BenefitsGrid /></div>
      <div id="closing"><ClosingSection /></div>
    </div>
  );
}
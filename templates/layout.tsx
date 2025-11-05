/**
 * Growth Engine Template Layout
 *
 * Tech, SaaS, growth story, modern capital markets
 * Structure: Category POV + metric carousel, growth narrative, product & moat
 */

import ComponentComposer from "@/components/ir/composition/ComponentComposer";
import { ComponentClusters } from "@/components/ir/composition/component-config";
import { prepareComponentData } from "@/lib/component-data-helpers";
import type { Company } from "@prisma/client";

// Type aliases for Template and Theme (until Prisma Client regenerates)
type Template = any;
type Theme = any;

interface GrowthEngineLayoutProps {
  company: Company & {
    pressReleases?: any[];
  };
  template: Template | null;
  theme: Theme | null;
}

export default async function GrowthEngineLayout({
  company,
  template,
  theme,
}: GrowthEngineLayoutProps) {
  // Prepare base component data from company (with CMS integration)
  const baseData = await prepareComponentData(company, true);

  // Merge with Growth Engine specific data
  const componentData = {
    ...baseData,
    // Market data is already fetched from CMS/market data API in baseData
    highlights: [
      "Rapid revenue growth with consistent YoY expansion",
      "Strong product-market fit validated by customer retention",
      "Expanding into new markets with proven business model",
      "Leading technology platform with competitive moat",
      "Experienced leadership team with track record of scaling",
    ],
    milestones: [
      {
        id: "founding",
        year: company.foundedYear || 2020,
        title: "Company Founded",
        description: "Started with a vision to transform the industry",
        type: "founding" as const,
      },
      {
        id: "series-a",
        year: (company.foundedYear || 2020) + 1,
        title: "Series A Funding",
        description: "Raised $10M to accelerate product development",
        type: "funding" as const,
      },
      {
        id: "growth",
        year: (company.foundedYear || 2020) + 2,
        title: "Rapid Growth Phase",
        description: "Expanded to 50+ employees and 1000+ customers",
        type: "milestone" as const,
      },
    ],
    kpis: [
      {
        label: "ARR",
        gaapValue: "$50M",
        change: "+150%",
        changePercent: "150.0",
        period: "FY 2024",
        trend: "up" as const,
      },
      {
        label: "YoY Growth",
        gaapValue: "+85%",
        change: "+15%",
        changePercent: "15.0",
        period: "Q4 2024",
        trend: "up" as const,
      },
      {
        label: "TAM",
        gaapValue: "$5B",
        change: "Expanding",
        period: "Addressable Market",
        trend: "up" as const,
      },
    ],
    // Analysts would come from CMS or database (not yet implemented)
    analysts: baseData.analysts || [],
  };

  // Get component configuration for Growth Engine template
  const components = ComponentClusters.growthEngine(componentData);

  // Apply theme styles
  const primaryColor =
    (theme?.colors as any)?.primary || company.primaryColor || "#0F172A";
  const accentColor =
    (theme?.colors as any)?.accent || company.accentColor || "#8B5CF6";
  const backgroundColor = (theme?.colors as any)?.background || "#667eea";
  const textColor = (theme?.colors as any)?.text || "#FFFFFF";
  const primaryFont =
    (theme?.typography as any)?.primaryFont ||
    (company as any).primaryFontFamily ||
    "Space Grotesk";
  const secondaryFont =
    (theme?.typography as any)?.secondaryFont ||
    (company as any).secondaryFontFamily ||
    primaryFont;

  return (
    <div
      className="ir-site growth-engine"
      style={{
        background: backgroundColor.includes("linear-gradient")
          ? backgroundColor
          : backgroundColor,
        color: textColor,
        fontFamily: primaryFont,
        minHeight: "100vh",
      }}
    >
      {/* Theme CSS Variables */}
      <style>{`
        :root {
          --primary-color: ${primaryColor};
          --accent-color: ${accentColor};
          --background-color: ${backgroundColor};
          --text-color: ${textColor};
          --primary-font: ${primaryFont};
          --secondary-font: ${secondaryFont};
        }
      `}</style>

      {/* Header */}
      <header
        className="border-b sticky top-0 z-50 backdrop-blur-sm bg-black/20"
        style={{ borderColor: `${textColor}20` }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {company.logoUrl && (
                <img
                  src={company.logoUrl}
                  alt={`${company.name} Logo`}
                  className="h-12"
                />
              )}
              <h1 className="text-2xl font-bold" style={{ color: textColor }}>
                {company.name}
              </h1>
              {company.tickerSymbol && (
                <span
                  className="text-sm px-2 py-1 rounded"
                  style={{
                    backgroundColor: `${accentColor}30`,
                    color: textColor,
                  }}
                >
                  {company.tickerSymbol}
                </span>
              )}
            </div>
            <nav>
              <ul className="flex items-center gap-6">
                <li>
                  <a
                    href="#growth"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Growth
                  </a>
                </li>
                <li>
                  <a
                    href="#investors"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Investors
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:underline"
                    style={{ color: textColor }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Render components using ComponentComposer */}
      <ComponentComposer
        template={template}
        theme={theme}
        company={company}
        components={components}
      />
    </div>
  );
}

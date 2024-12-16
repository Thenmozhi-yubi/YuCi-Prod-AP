import React from "react";
import KpiCounter from "./KpiCounter";

const Kpi = ({ kpiConfig = {} }) => {
  const { heading = {}, kpis = [] } = kpiConfig;

  return (
    <div className="p-8 bg-[#eeeaef]">
      <div className="text-center mb-8 ">
        <h1 className="text-4xl font-bold">{heading.title || "Default Title"}</h1>
        <p className="text-gray-600 mt-2">{heading.description || "Default description"}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8">
        {kpis.length > 0 ? (
          kpis.map((kpi, index) => (
            <div key={index} className="text-center">
              {/* First Line: Counter with Unit */}
              <div className="flex justify-center items-center space-x-2">
                <KpiCounter  targetValue={kpi.counter} />
                <p className="text-2xl font-bold text-black">
                  {kpi.unit === "Percentage" ? `%` : ` SEC`}
                </p>
              </div>
              {/* Second Line: KPI Title */}
              <p className="text-lg font-medium mt-2">{kpi.title}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center">No KPIs available</p>
        )}
      </div>
    </div>
  );
};

export default Kpi;

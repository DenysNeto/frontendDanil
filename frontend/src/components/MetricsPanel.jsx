import React from 'react';
import MetricCard from './MetricCard';

const MetricsPanel = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Tokens"
        value={metrics.tokens}
        suffix=""
        icon="📊"
        color="blue"
      />
      <MetricCard
        title="Cost"
        value={`$${metrics.cost}`}
        suffix=""
        icon="💰"
        color="green"
      />
      <MetricCard
        title="Latency"
        value={metrics.latency}
        suffix="ms"
        icon="⚡"
        color="yellow"
      />
    </div>
  );
};

export default MetricsPanel;
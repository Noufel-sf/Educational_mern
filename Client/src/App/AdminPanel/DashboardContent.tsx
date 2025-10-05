import React from "react";
import { BarChart3, Plus, Settings } from "lucide-react";
import { Users, BaggageClaim, PackageIcon } from "lucide-react";
import { useState } from "react";
import {state} from "../Types";



const StatCard = ({ stat }: { stat: state }) => (
  <div className={` p-6 rounded-lg shadow-sm `}
    style={{ backgroundColor: stat.color }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xl">{stat.title}</p>
        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
      </div>
    </div>
  </div>
);

const DashboardContent = ({stats}: {stats: state[]}) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-5xl font-extrabold text-[var(--primary)]">Dashboard</h1>
      <p className="mt-8 font-bold text-2xl">Welcome back! Here's what's happening.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat: state, index:number) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>

    
  </div>
);

export default DashboardContent;

import React from "react";
import { BarChart3, Plus, Settings } from "lucide-react";
import { Users, BaggageClaim, PackageIcon } from "lucide-react";
import { useState } from "react";

const stats = [
  { title: "Total Users", value: "1,234", change: "+5.2%", color: "blue" },
  { title: "Revenue", value: "$12,345", change: "+12.3%", color: "green" },
  { title: "Orders", value: "456", change: "-2.1%", color: "orange" },
  { title: "Conversion Rate", value: "3.2%", change: "+0.8%", color: "purple" },
];

const StatCard = ({ stat }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{stat.title}</p>
        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
      </div>
      <div
        className={`text-sm font-medium ${
          stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
        }`}
      >
        {stat.change}
      </div>
    </div>
  </div>
);

const DashboardContent = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-5xl font-extrabold text-[var(--primary)]">Dashboard</h1>
      <p className="mt-12 font-bold">Welcome back! Here's what's happening.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-extrabold text-gray-900 mb-4 ">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            {
              action: "New user registered",
              time: "2 minutes ago",
              type: "user",
            },
            {
              action: "Order #1234 completed",
              time: "15 minutes ago",
              type: "order",
            },
            {
              action: "System backup completed",
              time: "1 hour ago",
              type: "system",
            },
            {
              action: "New message received",
              time: "2 hours ago",
              type: "message",
            },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div
                className={`h-2 w-2 rounded-full ${
                  activity.type === "user"
                    ? "bg-blue-500"
                    : activity.type === "order"
                    ? "bg-green-500"
                    : activity.type === "system"
                    ? "bg-orange-500"
                    : "bg-purple-500"
                }`}
              ></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-extrabold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="space-y-3">
          <button className="w-full flex font-extrabold items-center justify-center px-4 py-2 bg-[var(--primary)] text-white cursor-pointer rounded-md hover:bg-[var(--secondary)] transition">
            <Plus className="h-4 w-4 mr-2" />
            Add New User
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Report
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardContent;

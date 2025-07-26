import React from "react";

const SettingsContent = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="text-gray-600">
        Manage your application settings and preferences.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          General Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name
            </label>
            <input
              type="text"
              defaultValue="My Admin Panel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              defaultValue="admin@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Notifications
        </h3>
        <div className="space-y-4">
          {[
            { label: "Email notifications", checked: true },
            { label: "Push notifications", checked: false },
            { label: "SMS notifications", checked: true },
            { label: "Weekly reports", checked: true },
          ].map((setting, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={setting.checked}
                className="h-4 w-4  border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                {setting.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="flex justify-end">
      <button className="px-4 py-2  text-white rounded-md bg-black p-4 hover:bg-[var(--primary-color)] transition">
        Save Changes
      </button>
    </div>
  </div>
);

export default SettingsContent;

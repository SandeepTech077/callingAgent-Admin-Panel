export default function Analytics() {
  return (
    <div>
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
            Analytics Dashboard
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart Placeholder 1 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-4">User Growth</h4>
              <div className="h-64 bg-linear-to-br from-blue-100 to-indigo-200 rounded-md flex items-center justify-center">
                <span className="text-gray-600">Chart: User Growth Over Time</span>
              </div>
            </div>

            {/* Chart Placeholder 2 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-4">Revenue Analytics</h4>
              <div className="h-64 bg-linear-to-br from-green-100 to-emerald-200 rounded-md flex items-center justify-center">
                <span className="text-gray-600">Chart: Revenue Trends</span>
              </div>
            </div>

            {/* Stats Table */}
            <div className="bg-gray-50 p-6 rounded-lg lg:col-span-2">
              <h4 className="text-md font-medium text-gray-900 mb-4">Performance Metrics</h4>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metric
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Change
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Page Views</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">45,678</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+12.5%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">↗️</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Conversion Rate</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3.24%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">-0.8%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">↘️</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bounce Rate</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">32.1%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">-5.2%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">↗️</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// 'use client';

// import React, { useEffect, useState, useRef } from 'react';
// import {
//   Chart,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import axios from 'axios';
// import { getCookie } from '@/actions/cookies';

// Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const PurchaseChart: React.FC<{ organizerId: number; groupBy: string }> = ({
//   organizerId,
//   groupBy,
// }) => {
//   const [chartData, setChartData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const chartRef = useRef<Chart<'bar'> | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = getCookie('token');

//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_BASE_API_URL}/statistic/${organizerId}?groupBy=${groupBy}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         );

//         const purchases = response.data;
//         console.log('API Response:', purchases);

//         if (Array.isArray(purchases)) {
//           const labels = purchases.map((purchase) =>
//             new Date(purchase.createdAt).toLocaleDateString(),
//           );
//           const data = purchases.map((purchase) => purchase._sum.totalPrice);

//           setChartData({
//             labels,
//             datasets: [
//               {
//                 label: 'Total Price (Rp)',
//                 data,
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1,
//               },
//             ],
//           });
//         } else {
//           console.error('API did not return an array:', purchases);
//         }
//       } catch (error) {
//         console.error('Error fetching purchase data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [organizerId, groupBy]);

//   useEffect(() => {
//     if (chartRef.current) {
//       chartRef.current.destroy();
//     }

//     if (chartData) {
//       const ctx = document.getElementById('purchaseChart') as HTMLCanvasElement;
//       chartRef.current = new Chart(ctx, {
//         type: 'bar',
//         data: chartData,
//       });
//     }
//   }, [chartData]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="chart-container">
//       <h2 className="text-xl font-semibold mb-4">Purchase Statistics</h2>
//       <canvas id="purchaseChart"></canvas>
//     </div>
//   );
// };

// export default PurchaseChart;

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, LineChart, Line } from "recharts";
// import "bootstrap/dist/css/bootstrap.min.css";

const staticAuctions = [
    { _id: 1, product_name: "Laptop", starting_price: 500, current_bid: 700, status: "Active", earnings: 700 },
    { _id: 2, product_name: "Smartphone", starting_price: 300, current_bid: 450, status: "Completed", earnings: 450 },
    { _id: 3, product_name: "Headphones", starting_price: 50, current_bid: 75, status: "Rejected", earnings: 0 },
    { _id: 4, product_name: "Camera", starting_price: 400, current_bid: 550, status: "Active", earnings: 550 },
    { _id: 5, product_name: "Smartwatch", starting_price: 200, current_bid: 275, status: "Completed", earnings: 275 }
];

const totalEarnings = staticAuctions.reduce((acc, item) => acc + item.earnings, 0);
const totalAuctions = staticAuctions.length;
const completedOrders = staticAuctions.filter(item => item.status === "Completed").length;

const auctionStats = staticAuctions.reduce((acc, auction) => {
    acc[auction.status] = (acc[auction.status] || 0) + 1;
    return acc;
}, {});

const chartData = Object.keys(auctionStats).map(status => ({
    name: status,
    count: auctionStats[status],
}));

const Dashboard = () => {
    return (
        <div className="h-100" style={{overflow: "hidden"}}>
            <div className="w-75 mx-auto d-flex justify-content-between mt-5">
                    <div className=" rounded p-2 d-flex justify-content-center align-items-center w-25">
                        <div className="d-flex gap-3">
                            <h5 className="text-white">Total Auctions :</h5>
                            <h5 className="text-white">{totalAuctions}</h5>
                        </div>
                    </div>
                    <div className=" rounded p-2 d-flex justify-content-center align-items-center w-25">
                        <div className="d-flex gap-3">
                            <h5 className="text-white">Completed Orders :</h5>
                            <h5 className="text-white">{completedOrders}</h5>
                        </div>
                    </div>
                    <div className=" rounded p-2 d-flex justify-content-center align-items-center w-25">
                        <div className="d-flex gap-3">
                            <h5 className="text-white">Total Earnings :</h5>
                            <h5 className="text-white">₹{totalEarnings}</h5>
                        </div>
                    </div>
            </div>

            <div style={{height: "867px"}}>
                <div className="h-100 p-3">

                  <div className="border-top border-bottom border-white w-100 h-50 d-flex justify-content-evenly align-items-center flex-column">
                    <h5 className="text-center text-white">Earnings Trend</h5>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={staticAuctions}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="product_name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="earnings" stroke="#ff7300" />
                        </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="w-100 d-flex h-50 gap-3">

                    <div className="h-100 w-25 d-flex justify-content-evenly align-items-center flex-column">
                        <h5 className="text-center text-white">Status Overview</h5>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#007bff" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="h-100 border border-white"></div>
                    <div className="w-25 h-100 d-flex justify-content-evenly align-items-center flex-column">
                      <h5 className="text-center text-white">Distribution</h5>
                      <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                              <Pie data={chartData} dataKey="count" nameKey="name" fill="#28a745" label />
                              <Tooltip />
                          </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-100 border border-white"></div>

                  </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;

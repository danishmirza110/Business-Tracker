import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";


const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

function OrderStatusChart({data}) {
  return (
    <div className="card shadow-sm p-3 h-100">
      <h5>Order Status</h5>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrderStatusChart;
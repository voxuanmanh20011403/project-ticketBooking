import { useEffect, useState } from "react";
import { db } from "data/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import { useMemo } from "react";
import { useCallback } from "react";

export const ChartNe = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  const handleSnapshot = useCallback((snapshot) => {
    const newLabels = [];
    const newData = [];

    snapshot.forEach((doc) => {
      const { viewer } = doc.data();
      const id = doc.id;
      const [year2, month2] = id.split("-");
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      const diff =
        (parseInt(currentYear) - parseInt(year2)) * 12 +
        (parseInt(currentMonth) - parseInt(month2));
      console.log("diff", diff);
      if (diff >= 0 && diff <= 12) {
        newLabels.push(id);
        newData.push(viewer);
      }
      // .lconsoleog("doc.id", doc.id);
      // console.log('id',id);
    });
    setLabels(newLabels);
    setData(newData);
  }, []);

  useEffect(() => {
    const garagesCol = collection(db, "statistics");
    const unsubscribe = onSnapshot(garagesCol, handleSnapshot);
    return unsubscribe;
  }, [handleSnapshot]);

  // Tạo dữ liệu cho biểu đồ
  const chartData = useMemo(() => {
    return {
      labels: labels,
      datasets: [
        {
          label: "Viewers",
          data: data,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  }, [labels, data]);
  // Cài đặt các tùy chọn cho biểu đồ
  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
  }, []);
  
console.log('alooooooooooo');
  // Render biểu đồ
  return <Line data={chartData} options={chartOptions} />;
};

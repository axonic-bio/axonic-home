"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import 'chart.js/auto';

let mouse = 0;

// ODE Constants
const g_Na = 120;
const g_K = 36;
const g_L = 0.3;

const E_Na = 115;
const E_K = -12;
const E_L = 10.6;

const C = 1;

function alpha_m(V: number): number {
  return 0.1 * (25 - V) / (Math.exp((25 - V) / 10) - 1);
}

function beta_m(V: number): number {
  return 4 * Math.exp(-V / 18);
}

function alpha_h(V: number): number {
  return 0.07 * Math.exp(-V / 20);
}

function beta_h(V: number): number {
  return 1 / (Math.exp((30 - V) / 10) + 1);
}

function alpha_n(V: number): number {
  return 0.01 * (10 - V) / (Math.exp((10 - V) / 10) - 1);
}

function beta_n(V: number): number {
  return 0.125 * Math.exp(-V / 80);
}

// Function to Calculate Derivatives
function hodgkinHuxley(y: number[], mouse: number): number[] {
  const [V, m, h, n] = y;

  // Calculate gating variables
  const dVdt = (mouse - (g_Na * Math.pow(m, 3) * h * (V - E_Na) + g_K * Math.pow(n, 4) * (V - E_K) + g_L * (V - E_L))) / C;
  const dmdt = alpha_m(V) * (1 - m) - beta_m(V) * m;
  const dhdt = alpha_h(V) * (1 - h) - beta_h(V) * h;
  const dndt = alpha_n(V) * (1 - n) - beta_n(V) * n;

  return [dVdt, dmdt, dhdt, dndt];
}


const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: true,
});

let y = [-70, alpha_m(-70) / (alpha_m(-70) + beta_m(-70)), alpha_h(-70) / (alpha_h(-70) + beta_h(-70)), alpha_n(-70) / (alpha_n(-70) + beta_n(-70))]

export default function Home() {
  const dt = 0.01; // Time step in ms

  const [chartData, setChartData] = useState({
    labels: [1],
    datasets: [
      {
        data: [1],
        fill: false,
        borderColor: 'rgb(150, 150, 150)',
        tension: 0.1,
      },
    ],
  });

  function solveODE() {
    for(let i = 0; i < 40; i++){
      const dy = hodgkinHuxley(y, mouse);
      const newY = y.map((val, index) => val + dy[index] * dt);
      y = newY;
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const { clientY } = e;
    const windowHeight = window.innerHeight;
    const current = Math.max(0, (1 - (clientY / (windowHeight / 2))) * 40); // Scale current with higher sensitivity, 0 at middle or below
    mouse = current;
  };

  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        min: -50,
        max: 120
      },
    },
    plugins: {
      legend: {
          display: false
      },
    },
    elements: {
      point: {
        radius: 0 // Set the radius of the points to 0 to hide them
      }
    },
    animation: {
      duration: 0
    },
  };

  useEffect(() => {
    setTimeout(function() {
      solveODE();

      let rawData = chartData["datasets"][0]["data"];
      if(rawData.length > 1000){
        rawData.splice(0, 1);
        rawData = rawData.concat(y[0]);
      }
      else{
        rawData = rawData.concat(y[0]);
      }

      setChartData({
        labels: rawData,
        datasets: [
          {
            data: rawData,
            fill: false,
            borderColor: 'rgba(150, 150, 150, 0.15)',
            tension: 0.5,
          },
        ],
      });
    }, 0.01);
  }, [chartData, setChartData]);

  return (
    <div onMouseMove={onMouseMove} className="content-center h-screen w-screen">
      <main className="content-center h-screen w-screen">
        <div className="h-screen w-screen">
          <h1 className="absolute text-center content-center text-7xl z-10 w-screen h-screen --font-geist-mono text-gray-800 text-opacity-50 dark:text-white dark:text-opacity-80">AXONIC</h1>
          <Line data={chartData} options={options} className="absolute z-0 h-screen pt-[10%]"/>
        </div>
      </main>
    </div>
  );
}


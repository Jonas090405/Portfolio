document.addEventListener("DOMContentLoaded", () => {
  const carContainer = document.getElementById("carsContainer");
  const cloudContainer = document.getElementById("cloudContainer");

  // === Autos ===
  const carCount = 4;
  const lanes = [-0.6, 0, 0.6];
  const laneUsage = { "-0.6": [], "0": [], "0.6": [] };

  for (let i = 0; i < carCount; i++) {
    const lane = lanes[i % lanes.length];
    const existingZs = laneUsage[lane.toString()];
    const offsetZ = 1.5 + existingZs.length * 0.8;

    const car = createCar();
    car.setAttribute("position", `${lane} 0.05 ${offsetZ}`);

    car.setAttribute("animation", {
      property: "position",
      to: `${lane} 0.05 -1.5`,
      dur: 4000 + Math.random() * 2000,
      easing: "linear",
      loop: true,
    });

    carContainer.appendChild(car);
    existingZs.push(offsetZ);
  }

  function createCar() {
    const car = document.createElement("a-entity");

    const body = document.createElement("a-box");
    body.setAttribute("color", getRandomColor());
    body.setAttribute("depth", "0.5");
    body.setAttribute("width", "0.3");
    body.setAttribute("height", "0.1");
    body.setAttribute("position", "0 0.05 0");
    car.appendChild(body);

    const roof = document.createElement("a-box");
    roof.setAttribute("color", "#cccccc");
    roof.setAttribute("depth", "0.3");
    roof.setAttribute("width", "0.2");
    roof.setAttribute("height", "0.07");
    roof.setAttribute("position", "0 0.12 0");
    car.appendChild(roof);

    const wheelPositions = [
      [-0.12, 0.02, 0.18],
      [0.12, 0.02, 0.18],
      [-0.12, 0.02, -0.18],
      [0.12, 0.02, -0.18],
    ];

    for (let [x, y, z] of wheelPositions) {
      const wheel = document.createElement("a-cylinder");
      wheel.setAttribute("radius", "0.065");
      wheel.setAttribute("height", "0.02");
      wheel.setAttribute("rotation", "90 0 0");
      wheel.setAttribute("position", `${x} ${y + 0.005} ${z}`);
      wheel.setAttribute("color", "black");
      car.appendChild(wheel);
    }

    return car;
  }

  function getRandomColor() {
    const colors = ["red", "blue", "green", "yellow", "orange", "white", "purple", "pink"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const cloudPositions = [
    [-1.5, 1.4, 0.5],
    [1.5, 1.3, -0.4],
    [0.0, 1.5, 1.2],
    [-1.3, 1.45, -1.0],
    [1.3, 1.4, 1.1],
    [-1.0, 1.5, -1.4],
    [1.0, 1.45, 1.4],
    [0.5, 1.6, 0],
    [-0.5, 1.6, 0]
  ];

  cloudPositions.forEach((pos, index) => {
    const cloud = createCloud(index);
    cloud.setAttribute("position", `${pos[0]} ${pos[1]} ${pos[2]}`);
    cloudContainer.appendChild(cloud);
  });

  function createCloud(index) {
    const cloud = document.createElement("a-entity");

    const parts = [
      { x: 0, y: 0, z: 0, r: 0.25 },
      { x: 0.3, y: 0, z: 0, r: 0.2 },
      { x: -0.3, y: 0, z: 0, r: 0.2 },
      { x: 0.15, y: 0.1, z: 0, r: 0.15 },
      { x: -0.15, y: 0.1, z: 0, r: 0.15 },
      { x: 0, y: 0.15, z: 0, r: 0.12 }
    ];

    parts.forEach(p => {
      const puff = document.createElement("a-sphere");
      puff.setAttribute("position", `${p.x} ${p.y} ${p.z}`);
      puff.setAttribute("radius", p.r);
      puff.setAttribute("color", "#ffffff");
      puff.setAttribute("opacity", "0.9");
      cloud.appendChild(puff);
    });

    cloud.setAttribute("animation", {
      property: "position",
      dir: "alternate",
      dur: 30000 + Math.random() * 90000,  
      to: `0 0.1 0`,
      loop: true,
      easing: "easeInOutSine"
    });

    return cloud;
  }
});

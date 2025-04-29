document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById("carsContainer");
  
    let carCount = 4;
    let lanes = [-0.6, 0, 0.6];
    let laneUsage = {
      "-0.6": [],
      "0": [],
      "0.6": [],
    };
  
    for (let i = 0; i < carCount; i++) {
      let lane = lanes[i % lanes.length]; // gleichmäßige Verteilung
      let existingZs = laneUsage[lane.toString()];
      let offsetZ = 1.5 + (existingZs.length * 0.8); // Abstand von 0.8
  
      let car = createCar();
      car.setAttribute("position", `${lane} 0.05 ${offsetZ}`);
  
      car.setAttribute("animation", {
        property: "position",
        to: `${lane} 0.05 -1.5`,
        dur: 4000 + Math.random() * 2000,
        easing: "linear",
        loop: true
      });
  
      container.appendChild(car);
      existingZs.push(offsetZ);
    }
  
    function createCar() {
      let car = document.createElement("a-entity");
  
      // Autokarosserie
      let body = document.createElement("a-box");
      body.setAttribute("color", getRandomColor());
      body.setAttribute("depth", "0.5");
      body.setAttribute("width", "0.3");
      body.setAttribute("height", "0.1");
      body.setAttribute("position", "0 0.05 0");
      car.appendChild(body);
  
      // Dach
      let roof = document.createElement("a-box");
      roof.setAttribute("color", "#cccccc");
      roof.setAttribute("depth", "0.3");
      roof.setAttribute("width", "0.2");
      roof.setAttribute("height", "0.07");
      roof.setAttribute("position", "0 0.12 0");
      car.appendChild(roof);
  
      // Räder
      let wheelPositions = [
        [-0.12, 0.02, 0.18],
        [ 0.12, 0.02, 0.18],
        [-0.12, 0.02, -0.18],
        [ 0.12, 0.02, -0.18],
      ];
  
      for (let [x, y, z] of wheelPositions) {
        let wheel = document.createElement("a-cylinder");
        wheel.setAttribute("radius", "0.065");  // größer
        wheel.setAttribute("height", "0.02");
        wheel.setAttribute("rotation", "90 0 0");
        wheel.setAttribute("position", `${x} ${y + 0.005} ${z}`); // leicht höher
        wheel.setAttribute("color", "black");
        car.appendChild(wheel);
      }
  
      return car;
    }
  
    function getRandomColor() {
      let colors = ["red", "blue", "green", "yellow", "orange", "white", "purple", "pink"];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  });
  
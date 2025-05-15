(() => {
  // Definición de ciudades
  const CITIES = {
    coastal: ["Bilbao", "Vigo", "Cádiz", "Valencia", "Barcelona"],
    inland: ["Valladolid", "Zaragoza", "Madrid", "Badajoz", "Granada"],
  };

  // Tarifas y límites
  const RATES = {
    terrestrial: 100, // €/tonelada
    maritime: 50, // €/tonelada
    maxWeightPerVehicle: 5, // toneladas
  };

  // Determina tipo de transporte
  function getTransportType(origin: string, destination: string): string {
    const isOriginCoastal = CITIES.coastal.includes(origin);
    const isDestCoastal = CITIES.coastal.includes(destination);

    if (!isOriginCoastal && !isDestCoastal) return "terrestre";
    if (isOriginCoastal && isDestCoastal) return "maritimo";
    return "mixto";
  }

  // Calcula coste total
  // Calcula coste para transporte terrestre
  function calculateLandCost(weight: number): number {
    const vehicles = Math.ceil(weight / RATES.maxWeightPerVehicle); //Math.ceil(), función matemática que redondea un número hacia el entero más cercano
    return vehicles * weight * RATES.terrestrial; // Coste = vehículos × peso × tarifa
  }
  // Calcula el coste para el transporte marítimo
  function calculateSeaCost(weight: number): number {
    return weight * RATES.maritime; // Coste = peso x tarifa
  }
  // Calcula el coste total
  function calculateTransportCost(
    origin: string,
    destination: string,
    weight: number
  ): number {
    const transportType = getTransportType(origin, destination); // Determina el tipo de transporte

    // Según el tipo de transporte, utiliza la función que le corresponda
    switch (transportType) {
      case "terrestre":
        return calculateLandCost(weight); // Sólo coste terrestre
      case "maritimo":
        return calculateSeaCost(weight); // Sólo coste marítimo
      case "mixto":
        // El coste mixto será la suma del coste terrestre (vehículos x peso x tarifa) más el coste marítimo (peso x tarifa)
        return calculateLandCost(weight) + calculateSeaCost(weight);
      default:
        throw new Error("Tipo de transporte no válido");
    }
  }

  // Función para manejar el cálculo desde HTML
  (window as any).calculateCost = function () {
    // Obtiene valores del formulario html
    const origin = (document.getElementById("origin") as HTMLSelectElement)
      .value;
    const destination = (
      document.getElementById("destination") as HTMLSelectElement
    ).value;
    const weight = parseFloat(
      (document.getElementById("weight") as HTMLInputElement).value
    );

    // try envuelve el código que podría generar problemas, si ocurre un error el flujo salta al catch inferior
    try {
      const cost = calculateTransportCost(origin, destination, weight);
      const resultDiv = document.getElementById("result") as HTMLDivElement;

      // Muestra los resultados en el HTML
      resultDiv.innerHTML = `
            <h3>Resultado</h3>
            <p><strong>Ruta:</strong> ${origin} → ${destination}</p>
            <p><strong>Tipo:</strong> ${getTransportType(
              origin,
              destination
            )}</p>
            <p><strong>Coste total:</strong> ${cost.toFixed(2)}€</p>
        `;
      resultDiv.style.display = "block";

      // catch captura el error sin romper la aplicación, el parámetro error tiene información del mismo
    } catch (error) {
      let errorMessage = "Ocurrió un error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(errorMessage); // Mensaje seguro
    }
  };
})();

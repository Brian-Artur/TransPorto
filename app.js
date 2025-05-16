


function calculateCost ( transportType, weight) {



  // On the ground transport: €100 per ton, max 5 tons
  if (transportType === 'ground') {
    if (weight > 5) return "Error: Ground transport max is 5 tons";

    return weight * 100;
  };
  
  // On the sea transport: €50 per ton
  if (transportType === 'sea') {
    return weight * 50;
  };
  
  // Mixed transport
  if (transportType === 'mixed') {

    let groundWeight;
    if (weight <= 5) {
      groundWeight = weight; // Take all
    } else {
      groundWeight = 5; // Take only 5
    }
    const seaWeight = weight - groundWeight;
    return (groundWeight * 100) + (seaWeight * 50);
  };
  
  return "Error: Invalid transport type";
};


//  examples
console.log("3 tons by ground:", calculateCost('ground', 3) + "€");
console.log("10 tons by sea:", calculateCost('sea', 10) + "€");
console.log("8 tons mixed:", calculateCost('mixed', 8) + "€");
console.log("20 tons by ground:", calculateCost('ground', 20));
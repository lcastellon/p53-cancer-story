/** People in the analogy are illustrative, not biological rates. */
export const houseStages = [
  { name: "Estado inicial", healthyParents: 2, healthyChildren: 2, cancerParents: 2, cancerChildren: 2, healthyAge: "small", departing: 0, invadedHouses: 0, healthyCaption: "2 padres + 2 hijos pequeños · Equilibrio", cancerCaption: "2 padres + 2 hijos · Parecen normales" },
  { name: "Siguiente generación", healthyParents: 2, healthyChildren: 2, cancerParents: 2, cancerChildren: 15, healthyAge: "teen", departing: 3, invadedHouses: 0, healthyCaption: "2 padres + 2 adolescentes · Equilibrio", cancerCaption: "2 padres + 15 hijos · Crecimiento sin freno" },
  { name: "Invasión y metástasis", healthyParents: 2, healthyChildren: 2, cancerParents: 2, cancerChildren: 15, healthyAge: "adult", departing: 3, invadedHouses: 9, healthyCaption: "Hijos adultos, nuevos hogares y nietos", cancerCaption: "Invasión local y colonización a distancia" },
] as const;
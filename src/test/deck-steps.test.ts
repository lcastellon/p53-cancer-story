import { describe, expect, it } from "vitest";
import { slides, TOTAL, advancePosition, retreatPosition } from "@/lib/deck";
import { houseStages } from "@/lib/house-analogy";

describe("Two-house analogy", () => {
  it("inserts a three-step slide 2 and keeps all 29 slides numbered", () => {
    expect(TOTAL).toBe(29);
    expect(slides[1]?.layout).toBe("houses");
    expect(slides[1]?.steps).toBe(3);
    expect(slides[1]?.notes).toHaveLength(3);
    expect(slides.map(s => s.n)).toEqual(Array.from({ length: 29 }, (_, i) => i + 1));
  });
  it("starts with two parents and two children on both sides", () => {
    expect(houseStages[0]).toMatchObject({ healthyParents: 2, healthyChildren: 2, cancerParents: 2, cancerChildren: 2, healthyAge: "small" });
  });
  it("keeps two teenagers in equilibrium while fifteen children crowd the other house and leave", () => {
    expect(houseStages[1]).toMatchObject({ healthyParents: 2, healthyChildren: 2, healthyAge: "teen", cancerParents: 2, cancerChildren: 15 });
    expect(houseStages[1].departing).toBeGreaterThan(0);
  });
  it("shows adult renewal against a whole invaded neighborhood in step three", () => {
    expect(houseStages[2].healthyAge).toBe("adult");
    expect(houseStages[2].invadedHouses).toBe(9);
  });
  it("uses the first two advances for reveals and the third for slide 3", () => {
    expect(advancePosition(1, 0)).toEqual({ index: 1, step: 1 });
    expect(advancePosition(1, 1)).toEqual({ index: 1, step: 2 });
    expect(advancePosition(1, 2)).toEqual({ index: 2, step: 0 });
    expect(retreatPosition(2, 0)).toEqual({ index: 1, step: 2 });
  });
  it("keeps the statistic and Peto layouts after renumbering", () => {
    expect(slides[4]?.layout).toBe("stat");
    expect(slides[22]?.layout).toBe("peto");
    expect(slides[22]?.steps).toBe(3);
    expect(advancePosition(22, 0)).toEqual({ index: 22, step: 1 });
    expect(advancePosition(22, 2)).toEqual({ index: 23, step: 0 });
  });
  it("shows slide 9 titled only 'El sospechoso equivocado'", () => {
    expect(slides[8]?.title).toBe("1980 - 1988: El sospechoso equivocado");
  });
});
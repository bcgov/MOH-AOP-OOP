import { isPastPath as testFunction } from "@/router/routes.js";
import { routeStepOrder } from "@/router/routes.js";

const stepOrderLength = routeStepOrder.length;

describe("Helper routes.js isPastPath", () => {
  it("returns false on invalid data", () => {
    const result = testFunction("default1", "default2");

    expect(result).toEqual(false);
  });

  it("returns false if argument 1 doesn't exist in the path order but argument 2 does", () => {
    const result = testFunction("default1", routeStepOrder[0].path);

    expect(result).toEqual(false);
  });

  it("returns true if argument 2 doesn't exist in the path order but argument 1 does", () => {
    const result = testFunction(routeStepOrder[0].path, "default2");

    expect(result).toEqual(true);
  });

  it("returns true if first argument is before the second argument in step order", () => {
    const result = testFunction(routeStepOrder[0].path, routeStepOrder[1].path);

    expect(result).toEqual(true);
  });

  it("returns true if first argument is before the second argument in step order (case 2)", () => {
    const result = testFunction(
      routeStepOrder[stepOrderLength - 2].path,
      routeStepOrder[stepOrderLength - 1].path
    );

    expect(result).toEqual(true);
  });

  it("returns false if second argument is before the first argument in step order", () => {
    const result = testFunction(routeStepOrder[1].path, routeStepOrder[0].path);

    expect(result).toEqual(false);
  });

  it("returns false if second argument is before the first argument in step order (case 2)", () => {
    const result = testFunction(
      routeStepOrder[stepOrderLength - 1].path,
      routeStepOrder[stepOrderLength - 2].path
    );

    expect(result).toEqual(false);
  });
});

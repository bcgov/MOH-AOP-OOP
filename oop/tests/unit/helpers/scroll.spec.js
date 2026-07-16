import * as scroll from "@/helpers/scroll.js";

const spyOnWindowScrollTo = vi.spyOn(window, "scrollTo").mockImplementation(vi.fn);

describe("Helper scroll.js scrollTo()", () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("calls window.scrollTo() when scrollTo() is called", () => {
    scroll.scrollTo(0);
    expect(spyOnWindowScrollTo).toHaveBeenCalled();
  });
});

/*
Remaining scroll tests are better covered in end to end testing
*/

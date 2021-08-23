import * as scroll from "@/helpers/scroll.js";

const spyOnWindowScrollTo = jest
  .spyOn(window, "scrollTo")
  .mockImplementation(jest.fn);
const spyOnScrollTo = jest.spyOn(scroll, "scrollTo");
const spyOnScrollToElement = jest.spyOn(scroll, "scrollToElement");
// .mockImplementation(jest.fn)

describe("Helper scroll.js scrollTo()", () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls window.scrollTo() when scrollTo() is called", () => {
    scroll.scrollTo(0);
    expect(spyOnWindowScrollTo).toHaveBeenCalled();
  });
});

/*
Remaining scroll tests are better covered in end to end testing
*/

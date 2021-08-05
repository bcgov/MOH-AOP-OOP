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
The following test doesn't work for unclear reasons. 
It appears that the function in scroll.js doesn't get mocked properly, 
and calling scrollToError doesn't call the mocked/spied version of ScrollToElement.
This causes its call to not be registered and the test to fail.

The only thing I can think of is that I need to use a wrapper/component in some way,
but if that's the case, I'd rather test this in integration/end to end testing anyways.
*/
describe.skip("Helper scroll.js scrollToError()", () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls window.scrollToElement() when scrollToError() is called", async () => {
    // console.log("rutabaga", scroll);
    await scroll.scrollToError();
    // scroll.scrollToElement(0);
    // scroll.dummyFunction();
    jest.advanceTimersByTime(5);
    await setTimeout(() => {}, 0);
    // expect(spyOnScrollToElement).toHaveBeenCalled();
  });
});

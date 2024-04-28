import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Userprofile from "../components/UserProfile";
import { screen } from "@testing-library/react";

describe("User component", () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "Glenna Reichert",
            email: "Chaim_McDermott@dana.io"
          },
          {
            id: 2,
            name: "Ervin Howell",
            email: "s9Nj5@example.com"
          }
        ])
    });
    globalThis.fetch = fetchMock;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("expecting data of users", async () => {
    render(<Userprofile />);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const names = await screen.findAllByText(/Glenna Reichert/i);
    expect(names.length).toBeGreaterThan(0);
    names.forEach(name => expect(name).toBeInTheDocument());
  });
});

import { expect, test, beforeAll, afterAll, afterEach, vi } from "vitest";
import { render, renderHook, screen, waitFor, within } from "@testing-library/react";
import Home from "../pages/home";

import { server } from "../mocks/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { usePosts } from "../pages/home/usePosts";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
  vi.mock("next/router", () => require("next-router-mock"));
});
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const createWrapper = () => {
  // ✅ creates a new QueryClient for each test
  const queryClient = new QueryClient()
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}


test("Pages Router", async () => {
  const wrapper = createWrapper();

  render(<Home />, {
    wrapper,
  });

  const { result } = renderHook(() => usePosts(), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(true))

  expect(screen.getByRole("img", { name: /vercel logo/i })).toBeDefined();
  expect(screen.getByText(/Current page/i)).toBeDefined();
  // count the number of posts
  expect(screen.getAllByText(/this is a post/i).length).toBe(3);
});

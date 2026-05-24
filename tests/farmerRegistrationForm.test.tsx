
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FarmerRegistrationForm from "@/components/form/farmer_registration";

// Clerk mock
vi.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    user: {
      id: "123",
      firstName: "John",
      lastName: "Doe",
      primaryEmailAddress: {
        emailAddress: "john@test.com",
      },
    },
  }),
}));

// Router mock
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

// Mock server actions
vi.mock("@/app/[locale]/actions/general", () => ({
  registerFarmer: vi.fn(),
  updateFarmer: vi.fn(),
}));

// Mock updateClerk
vi.mock("@/app/[locale]/actions/updateClerkMD", () => ({
  updateClerk: vi.fn(),
}));

// Mock Header component
vi.mock("@/components/header", () => ({
  default: () => <div>Header</div>,
}));

describe("FarmerRegistrationForm", () => {
  it("renders registration form", () => {
    render(<FarmerRegistrationForm />);

    expect(
      screen.getByText(/farmer registration/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/first name/i)).toBeInTheDocument();

    expect(screen.getByText(/last name/i)).toBeInTheDocument();

    expect(screen.getByText(/email/i)).toBeInTheDocument();
  });
});
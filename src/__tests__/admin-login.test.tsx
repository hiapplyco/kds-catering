import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { signInWithEmailAndPassword } from "firebase/auth";

// Mock firebase/auth
vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn((_auth, callback) => {
    callback(null);
    return vi.fn();
  }),
}));

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/chefs-kitchen/login",
}));

import AdminLoginPage from "@/app/chefs-kitchen/login/page";
import { AuthProvider } from "@/contexts/AuthContext";

const mockSignIn = signInWithEmailAndPassword as ReturnType<typeof vi.fn>;

function renderLogin() {
  return render(
    <AuthProvider>
      <AdminLoginPage />
    </AuthProvider>
  );
}

describe("Admin Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignIn.mockResolvedValue({ user: { uid: "test" } });
  });

  it("renders login form with password field only", () => {
    renderLogin();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    // No email field
    expect(screen.queryByPlaceholderText("chef@kdscomfortfood.com")).not.toBeInTheDocument();
  });

  it("renders sign in button", () => {
    renderLogin();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("renders Chef's Kitchen header", () => {
    renderLogin();
    expect(screen.getByText(/Chef.*s Kitchen/)).toBeInTheDocument();
  });

  it("renders KDS Comfort Food subtitle", () => {
    renderLogin();
    expect(screen.getByText("KDS Comfort Food Admin Panel")).toBeInTheDocument();
  });

  it("renders back to website link", () => {
    renderLogin();
    const link = screen.getByText(/back to website/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("has required password input", () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText("Enter password");
    expect(passwordInput).toHaveAttribute("required");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("has a password visibility toggle button", () => {
    renderLogin();
    const buttons = screen.getAllByRole("button");
    const eyeButton = buttons.find((b) => b.getAttribute("type") === "button");
    expect(eyeButton).toBeTruthy();
  });

  it("updates password field on input", async () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText("Enter password") as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: "secret123" } });
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Enter password")).toHaveValue("secret123");
    });
  });

  it("signs in with hardcoded admin email and padded password", async () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "yaya" },
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Enter password")).toHaveValue("yaya");
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        expect.anything(),
        "admin@kdscomfortfood.com",
        "yaya!!kds"
      );
    });
  });

  it("shows error on wrong password", async () => {
    mockSignIn.mockRejectedValueOnce({ code: "auth/invalid-credential" });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "wrong" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText("Incorrect password")).toBeInTheDocument();
    });
  });
});

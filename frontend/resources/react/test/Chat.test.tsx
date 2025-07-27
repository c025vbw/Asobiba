import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Chat from "../components/Chat";

test("ユーザーがコメントを入力して送信できる", () => {
  render(<Chat />);
  const input = screen.getByPlaceholderText("コメントを入力");
  const button = screen.getByText("送信");

  fireEvent.change(input, { target: { value: "こんにちは" } });
  fireEvent.click(button);

  expect(screen.getByText("こんにちは")).toBeInTheDocument();
});
